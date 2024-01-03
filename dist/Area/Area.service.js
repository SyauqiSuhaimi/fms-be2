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
exports.AreaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const area_entity_1 = require("../entities/area.entity");
const typeorm_2 = require("typeorm");
const tmp = require("tmp");
const xlsx = require("xlsx");
const fs = require("fs");
let AreaService = class AreaService {
    constructor(AreaRepository) {
        this.AreaRepository = AreaRepository;
    }
    findAll() {
        return this.AreaRepository.find();
    }
    async findArea(condition) {
        return this.AreaRepository.find(condition);
    }
    async findOne(condition) {
        return this.AreaRepository.findOne(condition);
    }
    create(data) {
        return this.AreaRepository.save(data);
    }
    async update(id, data) {
        await this.AreaRepository.update(id, data);
    }
    async remove(id) {
        await this.AreaRepository.delete(id);
    }
    async downloadexceldata() {
        let data = await this.AreaRepository.find({
            relations: ["department", "subarea", "company"],
        });
        let rows = [];
        console.log(data);
        data.forEach((doc) => {
            rows.push(Object.values(doc));
        });
        let book = new exceljs_1.Workbook();
        let sheet = book.addWorksheet("sheet1");
        rows.unshift(Object.keys(data[0]));
        sheet.addRows(rows);
        this.styleSheet(sheet);
        let file = await new Promise((resolve, rejects) => {
            tmp.file({
                discardDrescriptor: true,
                prefix: `AreaData`,
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
    styleSheet(sheet) {
        sheet.getColumn(1).width = 5.5;
        sheet.getColumn(2).width = 20.5;
        sheet.getColumn(3).width = 15.5;
        sheet.getRows(0).height = 30.5;
    }
    async parseExcelFile(files, company) {
        if (!files || files.length === 0) {
            console.error("No files passed to parseExcelFile function");
            return;
        }
        const file = files[0].path;
        console.log(file, "sini tgk apa keluar");
        const workbook = xlsx.read(fs.readFileSync(file).toString("binary"), {
            type: "binary",
        });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(worksheet);
        console.log(data, "sini nak nk tengok data yg dah read");
        const processedData = this.preProcessData(data, company);
        await this.saveData(processedData);
    }
    preProcessData(data, company) {
        try {
            return data.map((item) => ({
                name: item.name,
                type: item.type,
                department: item.department,
                company: item.company || company,
                subarea: item.subarea ? item.subarea : [],
            }));
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveData(processedData) {
        for (const item of processedData) {
            item.subarea = JSON.parse(item.subarea);
            console.log("save area", item);
            await this.create(item);
        }
    }
};
AreaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(area_entity_1.Area)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AreaService);
exports.AreaService = AreaService;
//# sourceMappingURL=Area.service.js.map