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
exports.CaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const Excel = require("exceljs");
const case_entity_1 = require("../entities/case.entity");
const typeorm_2 = require("typeorm");
const tmp = require("tmp");
let CaseService = class CaseService {
    constructor(CaseRepository) {
        this.CaseRepository = CaseRepository;
    }
    findAll(condition = {}) {
        return this.CaseRepository.find(condition);
    }
    async findCase(condition) {
        return this.CaseRepository.find(condition);
    }
    async findUnassigned(condition) {
        return this.CaseRepository.query(condition);
    }
    async findOne(condition) {
        return this.CaseRepository.findOne(condition);
    }
    create(data) {
        return this.CaseRepository.save(data);
    }
    async update(id, data) {
        return this.CaseRepository.update(id, data);
    }
    async remove(id) {
        return this.CaseRepository.delete(id);
    }
    async delCondition(condition) {
        return this.CaseRepository.delete(condition);
    }
    async reportCase(condition) {
        const [list, count] = await this.CaseRepository.findAndCount(condition);
        return { list, count };
    }
    async getPPM(userId, bodyData) {
        let response = null;
        if (bodyData["endRange"] == 0) {
            response = await this.CaseRepository.find({
                where: {
                    casetype: { name: "PPM" },
                    requestor: { company: { user: { id: userId["id"] } } },
                    case_status: { id: (0, typeorm_2.In)(bodyData["status"]) },
                },
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.department",
                    "location",
                    "worktrade.grouplist",
                    "ppm.ppmchecklist",
                ],
            });
        }
        else {
            response = await this.CaseRepository.find({
                where: {
                    casetype: { name: "PPM" },
                    equipment: { company: { user: { id: userId["id"] } } },
                    case_status: { id: (0, typeorm_2.In)(bodyData["status"]) },
                    request_date: (0, typeorm_2.Between)(bodyData["startRange"], bodyData["endRange"]),
                },
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.department",
                    "location",
                    "worktrade.grouplist",
                    "ppm.ppmchecklist",
                ],
            });
        }
        return response;
    }
    createQueryBuilder(alias) {
        return this.CaseRepository.createQueryBuilder(alias);
    }
    async getCasebyCompany(userId, bodyData) {
        let response = null;
        if (bodyData["endRange"] == 0) {
            response = await this.CaseRepository.find({
                where: {
                    casetype: { name: (0, typeorm_2.Not)("PPM") },
                    requestor: { company: { user: { id: userId["id"] } } },
                    case_status: { id: (0, typeorm_2.In)(bodyData["status"]) },
                },
                relations: [
                    "equipment",
                    "case_status",
                    "casetype",
                    "equipment_type",
                    "location",
                    "worktrade.grouplist",
                ],
            });
        }
        else {
            response = await this.CaseRepository.find({
                where: {
                    casetype: { name: (0, typeorm_2.Not)("PPM") },
                    requestor: { company: { user: { id: userId["id"] } } },
                    case_status: { id: (0, typeorm_2.In)(bodyData["status"]) },
                    request_date: (0, typeorm_2.Between)(bodyData["startRange"], bodyData["endRange"]),
                },
                relations: [
                    "equipment",
                    "case_status",
                    "casetype",
                    "equipment_type",
                    "location",
                ],
            });
        }
        return response;
    }
    async getCaseCount(userId, bodyData) {
        let response = null;
        if (bodyData["endRange"] == 0) {
            response = await this.CaseRepository.count({
                where: {
                    casetype: { name: (0, typeorm_2.Not)("PPM") },
                    requestor: { company: { user: { id: userId["id"] } } },
                    case_status: { id: (0, typeorm_2.In)(bodyData["status"]) },
                },
            });
        }
        else {
            response = await this.CaseRepository.count({
                where: {
                    casetype: { name: (0, typeorm_2.Not)("PPM") },
                    requestor: { company: { user: { id: userId["id"] } } },
                    case_status: { id: (0, typeorm_2.In)(bodyData["status"]) },
                    request_date: (0, typeorm_2.Between)(bodyData["startRange"], bodyData["endRange"]),
                },
            });
        }
        return response;
    }
    async getppmCount(userId, bodyData) {
        let response = null;
        if (bodyData["endRange"] == 0) {
            response = await this.CaseRepository.count({
                where: {
                    casetype: { name: (0, typeorm_2.Not)("PPM") },
                    requestor: { company: { user: { id: userId["id"] } } },
                    case_status: { id: (0, typeorm_2.In)(bodyData["status"]) },
                },
            });
        }
        else {
            response = await this.CaseRepository.count({
                where: {
                    casetype: { name: "PPM" },
                    requestor: { company: { user: { id: userId["id"] } } },
                    case_status: { id: (0, typeorm_2.In)(bodyData["status"]) },
                    request_date: (0, typeorm_2.Between)(bodyData["startRange"], bodyData["endRange"]),
                },
            });
        }
        return response;
    }
    async getdata() {
        let data = await this.CaseRepository.find({
            relations: [
                "casehistory",
                "users",
                "equipment",
                "equipment.department",
                "equipment.subarea",
                "casetype",
                "worktrade",
                "fromsubarea",
                "tosubarea",
                "technician",
                "case_status",
            ],
        });
        console.log("data", data);
        return data;
    }
    epochtodate(d) {
        let tempdate = new Date(d * 1000);
        let year = tempdate.getFullYear();
        let month = (tempdate.getMonth() + 1).toString().padStart(2, "0");
        let day = tempdate.getDate().toString().padStart(2, "0");
        let str = `${year}-${month}-${day}`;
        return str;
    }
    async downloaddata() {
        let data = await this.CaseRepository.find({
            relations: [
                "casehistory",
                "equipment",
                "equipment.department",
                "equipment.subarea",
                "casetype",
                "worktrade",
                "fromsubarea",
                "tosubarea",
                "technician",
                "case_status",
            ],
        });
        console.log("data", data);
        let columns = [
            {
                field: "id",
                format: (value) => `${value}`,
                label: "id",
            },
            {
                field: "case_status",
                format: (value) => `${value.name}`,
                label: "case_status",
            },
            {
                field: "casetype",
                format: (value) => `${value ? value.name : ""}`,
                label: "casetype",
            },
            {
                field: "worktrade",
                format: (value) => `${value ? value.name : ""}`,
                label: "Group",
            },
            {
                field: "equipment",
                format: (value) => `${value ? value.critical : ""}`,
                label: "Work Priority",
            },
            {
                field: "equipment",
                format: (value) => `${value ? value.serial_number : ""}`,
                label: "SJSB Asset No",
            },
            {
                field: "equipment",
                format: (value) => `${value ? value.asset_number : ""}`,
                label: "Government Asset No",
            },
            {
                field: "equipment",
                format: (value) => `${value ? value.description : ""}`,
                label: "Asset Description",
            },
            {
                field: "equipment",
                format: (value) => `${value ? value.department.name : ""}`,
                label: "Asset Department/ Unit",
            },
            {
                field: "equipment",
                format: (value) => `${value ? value.subarea.name : ""}`,
                label: "Asset Location",
            },
            {
                field: "request_date",
                format: (value) => `${this.epochtodate(value)}`,
                label: "request_date",
            },
            {
                field: "casehistory",
                format: (value) => `${this.epochtodate(value)}`,
                label: "Response Date and Time",
            },
            {
                field: "casehistory",
                format: (value) => `${value ? value.casehistory : ""}`,
                label: "Response By",
            },
        ];
        let rows = [];
        const processedRows = [];
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
        let book = new exceljs_1.Workbook();
        let sheet = book.addWorksheet("sheet1");
        rows.unshift(Object.keys(processedRows[0]));
        sheet.addRows(rows);
        let file = await new Promise((resolve, rejects) => {
            tmp.file({
                discardDrescriptor: true,
                prefix: ``,
                postfix: ".xlsx",
                mode: parseInt("0600", 8),
            }, async (err, file) => {
                if (err)
                    throw new common_1.BadRequestException(err);
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
    async downloadexceldata() {
        let data = await this.CaseRepository.find({
            relations: [
                "casehistory",
                "equipment",
                "equipment.department",
                "equipment.subarea",
                "casetype",
                "worktrade",
                "fromsubarea",
                "tosubarea",
                "technician",
                "case_status",
            ],
        });
        console.log("data", data);
        const workbook = new Excel.Workbook();
        const worksheet1 = workbook.addWorksheet("case list");
        const worksheet2 = workbook.addWorksheet("case history");
        worksheet1.columns = [
            { header: "Case ID", key: "id" },
            { header: "Case ID", key: "id" },
            { header: "Case ID", key: "id" },
            { header: "Case ID", key: "id" },
            { header: "Case ID", key: "id" },
        ];
    }
};
CaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(case_entity_1.Case)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CaseService);
exports.CaseService = CaseService;
//# sourceMappingURL=case.service.js.map