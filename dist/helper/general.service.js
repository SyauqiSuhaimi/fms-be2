"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralService = void 0;
const common_1 = require("@nestjs/common");
const exceljs_1 = require("exceljs");
const tmp = require("tmp");
const moment = require("moment");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const case_entity_1 = require("../entities/case.entity");
const equipment_entity_1 = require("../entities/equipment.entity");
const typeorm_3 = require("typeorm");
const fs = require("fs");
const axios_1 = require("axios");
const path = require("path");
let GeneralService = class GeneralService {
    constructor(caseRepository, equipmentRepository, connection) {
        this.caseRepository = caseRepository;
        this.equipmentRepository = equipmentRepository;
        this.connection = connection;
    }
    deepCopy(obj) {
        if (typeof obj !== "object" || obj === null) {
            return obj;
        }
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        if (obj instanceof Array) {
            return obj.reduce((arr, item, i) => {
                arr[i] = this.deepCopy(item);
                return arr;
            }, []);
        }
        if (obj instanceof Object) {
            return Object.keys(obj).reduce((newObj, key) => {
                newObj[key] = this.deepCopy(obj[key]);
                return newObj;
            }, {});
        }
    }
    async downloadExcelData(data, fileNamePrefix, columns = null, multisheet = false) {
        let rows = [];
        let book = new exceljs_1.Workbook();
        if (multisheet == true) {
            let sheetlist = Object.keys(data);
            sheetlist.forEach((sheetname) => {
                let tempdata = data[sheetname];
                let temprow = [];
                if (columns[sheetname]) {
                    const processedRows = [];
                    let columnarr = columns[sheetname].map((item) => item.label);
                    tempdata.forEach((row) => {
                        const processedRow = {};
                        columns[sheetname].forEach((column) => {
                            const value = row[column.field];
                            const formattedValue = column.format
                                ? column.format(value)
                                : value;
                            processedRow[column.label] = formattedValue;
                        });
                        processedRows.push(processedRow);
                    });
                    processedRows.forEach((doc) => {
                        temprow.push(Object.values(doc));
                    });
                    temprow.unshift(columnarr);
                }
                else {
                    if (tempdata && tempdata.length) {
                        tempdata.forEach((doc) => {
                            temprow.push(Object.values(doc));
                        });
                        temprow.unshift(Object.keys(tempdata[0]));
                    }
                }
                book.addWorksheet(sheetname).addRows(temprow);
                this.newstyleSheet(book, {});
            });
        }
        else {
            if (columns) {
                const processedRows = [];
                let columnarr = columns.map((item) => item.label);
                data.forEach((row) => {
                    const processedRow = {};
                    columns.forEach((column) => {
                        const value = row[column.field];
                        const formattedValue = column.format ? column.format(value) : value;
                        processedRow[column.label] = formattedValue;
                    });
                    processedRows.push(processedRow);
                });
                processedRows.forEach((doc) => {
                    rows.push(Object.values(doc));
                });
                rows.unshift(columnarr);
            }
            else {
                data.forEach((doc) => {
                    rows.push(Object.values(doc));
                });
                rows.unshift(Object.keys(data[0]));
            }
            let sheet = book.addWorksheet("sheet1");
            sheet.addRows(rows);
            this.styleSheet(sheet);
        }
        let file = await new Promise((resolve, rejects) => {
            tmp.file({
                discardDescriptor: true,
                prefix: `${fileNamePrefix}Data`,
                postfix: ".xlsx",
                mode: parseInt("0600", 8),
            }, async (err, file) => {
                if (err) {
                    throw new common_1.BadRequestException(err);
                }
                book.xlsx
                    .writeFile(file)
                    .then((_) => {
                    resolve(file);
                })
                    .catch((err) => {
                    throw new common_1.BadRequestException(err);
                });
            });
        });
        return file;
    }
    styleSheet(sheet) {
        const columnMaxWidths = sheet.columns.map((column) => column.values.reduce((acc, value) => Math.max(acc, value ? value.toString().length : 0), column.header ? column.header.toString().length : 0));
        columnMaxWidths.forEach((maxWidth, index) => {
            sheet.getColumn(index + 1).width = maxWidth + 2;
        });
    }
    newstyleSheet(workbook, sheetStyles) {
        workbook.eachSheet((sheet, sheetId) => {
            const sheetStyle = sheetStyles[sheet.name] || {};
            const columnMaxWidths = sheet.columns
                ? sheet.columns.map((column = null) => column.values.reduce((acc, value) => Math.max(acc, value ? value.toString().length : 0), column.header ? column.header.toString().length : 0))
                : [];
            columnMaxWidths.forEach((maxWidth, index) => {
                sheet.getColumn(index + 1).width = maxWidth + 2;
            });
            if (sheet.columns) {
                sheet.columns.forEach((column, columnIndex) => {
                    const columnStyle = sheetStyle[column.key] || {};
                    if (columnStyle.fontSize || columnStyle.bold) {
                        column.eachCell((cell, rowNumber) => {
                            if (rowNumber === 1) {
                                const cellFont = cell.font || {};
                                cell.font = Object.assign({}, cellFont, {
                                    size: columnStyle.fontSize || cellFont.size,
                                    bold: columnStyle.bold !== undefined
                                        ? columnStyle.bold
                                        : cellFont.bold,
                                });
                            }
                        });
                    }
                    if (columnStyle.fontColor) {
                        column.eachCell((cell, rowNumber) => {
                            if (rowNumber === 1) {
                                const cellFont = cell.font || {};
                                cell.font = Object.assign({}, cellFont, {
                                    color: { argb: columnStyle.fontColor },
                                });
                            }
                        });
                    }
                    if (columnStyle.bgColor) {
                        column.eachCell((cell, rowNumber) => {
                            if (rowNumber === 1) {
                                const cellFill = cell.fill || {};
                                cell.fill = Object.assign({}, cellFill, {
                                    type: "pattern",
                                    pattern: "solid",
                                    bgColor: { argb: columnStyle.bgColor },
                                    fgColor: { argb: columnStyle.bgColor },
                                });
                            }
                        });
                    }
                    if (columnStyle.verticalAlignment ||
                        columnStyle.horizontalAlignment ||
                        columnStyle.wrapText) {
                        column.eachCell((cell, rowNumber) => {
                            const cellAlignment = cell.alignment || {};
                            cell.alignment = Object.assign({}, cellAlignment, {
                                vertical: columnStyle.verticalAlignment || cellAlignment.vertical,
                                horizontal: columnStyle.horizontalAlignment || cellAlignment.horizontal,
                                wrapText: columnStyle.wrapText !== undefined
                                    ? columnStyle.wrapText
                                    : cellAlignment.wrapText,
                            });
                        });
                    }
                    if (columnStyle.border) {
                        column.eachCell((cell, rowNumber) => {
                            const cellBorder = cell.border || {};
                            cell.border = Object.assign({}, cellBorder, {
                                top: columnStyle.border.top || cellBorder.top,
                                left: columnStyle.border.left || cellBorder.left,
                                bottom: columnStyle.border.bottom || cellBorder.bottom,
                                right: columnStyle.border.right || cellBorder.right,
                            });
                        });
                    }
                });
            }
        });
    }
    epochtodate(d) {
        let tempdate = new Date(d * 1000);
        let year = tempdate.getFullYear();
        let month = (tempdate.getMonth() + 1).toString().padStart(2, "0");
        let day = tempdate.getDate().toString().padStart(2, "0");
        let str = `${day}/${month}/${year}`;
        let hours = tempdate.getHours();
        let minutes = tempdate.getMinutes().toString().padStart(2, "0");
        let seconds = tempdate.getSeconds().toString().padStart(2, "0");
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        let timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;
        return `${str},  ${timeStr}`;
    }
    epochtodateonly(d) {
        let tempdate = new Date(d * 1000);
        let year = tempdate.getFullYear();
        let month = (tempdate.getMonth() + 1).toString().padStart(2, "0");
        let day = tempdate.getDate().toString().padStart(2, "0");
        let str = `${day}/${month}/${year}`;
        return `${str}`;
    }
    strToEpoch(thedate) {
        const date = moment(thedate, "DD/MM/YYYY,  h:mm:ss A");
        if (!date.isValid()) {
            console.error("Invalid date format:", thedate);
            return null;
        }
        return date.unix();
    }
    getIntervalDesc(search) {
        let ppmInterval = [
            { id: 1, label: "Daily", value: 86400 },
            { id: 2, label: "Weekly", value: 604800 },
            { id: 3, label: "Monthly", value: 2592000 },
            { id: 4, label: "Every 2 months", value: 5184000 },
            { id: 5, label: "Every 3 months", value: 7776000 },
            { id: 6, label: "Every 6 months", value: 15552000 },
            { id: 7, label: "Every 9 months", value: 23328000 },
            { id: 8, label: "Every 1 year", value: 31536000 },
        ];
        let selectedInterval = [];
        selectedInterval = ppmInterval.filter((item) => item.value == search);
        return selectedInterval[0].label;
    }
    flattenArrayOfObjects(InputName, Inputarr, rootname = null, root = null, keylist = null) {
        let Output = {};
        if (rootname == null) {
            Output = {};
        }
        Output[InputName] = [];
        Inputarr.forEach((obj) => {
            let flattenedObj = {};
            if (rootname && root && keylist)
                keylist.forEach((root_key) => {
                    flattenedObj[`${rootname}_${root_key}`] = root[root_key];
                });
            const flattenNestedObjects = (nestedObj, prefix) => {
                for (let [key, value] of Object.entries(nestedObj)) {
                    const newKey = prefix ? `${prefix}_${key}` : key;
                    if (Array.isArray(value)) {
                        if (!Output[newKey])
                            Output[newKey] = [];
                        let temparr = this.flattenArrayOfObjects(newKey, value, InputName, nestedObj, ["id", "name"])[newKey];
                        Array.prototype.push.apply(Output[newKey], this.deepCopy(temparr));
                    }
                    else if (typeof value === "object" && value !== null) {
                        flattenNestedObjects(value, newKey);
                    }
                    else {
                        flattenedObj[newKey] = value;
                    }
                }
            };
            flattenNestedObjects(obj, null);
            Output[InputName].push(flattenedObj);
        });
        return Output;
    }
    getMetadataInfo(metadata) {
        const tableName = metadata.tableName;
        const excludedColumn = ["password"];
        let columns = [];
        metadata.nonVirtualColumns.forEach((column) => {
            if (!excludedColumn.includes(column.propertyName)) {
                columns.push({
                    checked: false,
                    name: column.propertyName,
                    dataType: column.type,
                    options: column["options"],
                });
            }
        });
        const excludedRelations = [
            "company",
            "tempPpm",
            "servicecontract",
            "equipment_history",
            "permissions",
            "features",
        ];
        let relations = [];
        metadata.relations.forEach((relation) => {
            if (!excludedRelations.includes(relation.propertyName)) {
                relations.push({
                    checked: false,
                    name: relation.propertyName,
                    relationType: relation.relationType,
                    options: relation["options"],
                    foreignKey: relation.joinColumns.length
                        ? relation.joinColumns[0].databaseName
                        : relation.propertyName,
                    relatedTableName: relation.inverseEntityMetadata.tableName,
                });
            }
        });
        const output = {
            columns,
            relations,
        };
        return output;
    }
    mapEntityToJSON(entityname) {
        const entities = this.connection.entityMetadatas;
        const entityMetadata = entities.find((metadata) => {
            if (metadata.tableName === entityname)
                return metadata;
        });
        if (entityMetadata)
            return this.getMetadataInfo(entityMetadata);
        else
            return null;
    }
    async writeJsonToFile(filePath, data) {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(filePath)) {
                const existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));
                const updatedData = { ...existingData, ...data };
                fs.writeFile(filePath, JSON.stringify(updatedData), (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                fs.writeFile(filePath, JSON.stringify(data), (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    }
    async readJsonFromFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }
    async downloadFile(url) {
        try {
            const response = await (0, axios_1.default)({
                method: "GET",
                url: url,
                responseType: "stream",
            });
            console.log("Cookies2");
            const fileName = path.basename(url);
            const destinationFolder = "./files";
            const filePath = path.join(destinationFolder, fileName);
            console.log("Cookies3");
            if (!fs.existsSync(destinationFolder)) {
                fs.mkdirSync(destinationFolder, { recursive: true });
            }
            console.log("Cookies4");
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);
            console.log("Cookies:");
            return new Promise((resolve, reject) => {
                writer.on("finish", () => resolve(filePath));
                writer.on("error", reject);
            });
        }
        catch (error) {
            throw new Error("File download failed");
        }
    }
    async jsondaata(url) {
        try {
            const response = await axios_1.default.get(url);
            if (response.status === 200) {
                const jsonData = JSON.stringify(response.data);
                return response.data;
            }
            else {
                throw new Error("Failed to fetch data");
            }
        }
        catch (error) {
            console.log("error", error);
            throw new Error("File download failed");
        }
    }
    savebase64(folderPath, base64data) {
        if (base64data === null || base64data === void 0 ? void 0 : base64data.length) {
            const [type, data] = base64data.split(";base64,");
            const extension = type.split("/").pop() || "";
            const fileName = `${Math.random().toString(36).slice(2)}.${extension}`;
            const imagePath = path.join(folderPath, fileName);
            const imageBuffer = Buffer.from(data, "base64");
            fs.writeFileSync(imagePath, imageBuffer);
            console.log("fileName", fileName);
            return fileName;
        }
        else {
            return null;
        }
    }
    removepasswordcase(cases) {
        if (cases && cases.length > 0) {
            cases.forEach((singleCase) => {
                if (singleCase.requestor) {
                    delete singleCase.requestor.password;
                }
            });
        }
    }
};
GeneralService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(case_entity_1.Case)),
    __param(1, (0, typeorm_1.InjectRepository)(equipment_entity_1.Equipment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_3.Connection])
], GeneralService);
exports.GeneralService = GeneralService;
//# sourceMappingURL=general.service.js.map