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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const department_entity_1 = require("../entities/department.entity");
const typeorm_2 = require("typeorm");
const dataD_1 = require("./dataD");
const tmp = require("tmp");
const xlsx = require("xlsx");
const fs = require("fs");
let DepartmentService = class DepartmentService {
    constructor(DepartmentRepository) {
        this.DepartmentRepository = DepartmentRepository;
    }
    findAll() {
        return this.DepartmentRepository.find();
    }
    findDepartment(condition) {
        return this.DepartmentRepository.find(condition);
    }
    async findOne(condition) {
        return this.DepartmentRepository.findOne(condition);
    }
    create(cases) {
        return this.DepartmentRepository.save(cases);
    }
    async update(id, cases) {
        return this.DepartmentRepository.update(id, cases);
    }
    async remove(id) {
        return this.DepartmentRepository.delete(id);
    }
    async donwloadExcel() {
        if (!dataD_1.data) {
            throw new common_1.NotFoundException("no data download");
        }
        let rows = [];
        console.log(dataD_1.data);
        dataD_1.data.forEach((doc) => {
            rows.push(Object.values(doc));
        });
        let book = new exceljs_1.Workbook();
        let sheet = book.addWorksheet("sheet1");
        rows.unshift(Object.keys(dataD_1.data[0]));
        sheet.addRows(rows);
        let file = await new Promise((resolve, rejects) => {
            tmp.file({
                discardDrescriptor: true,
                prefix: `template`,
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
        console.log(processedData, "sini tgk data dia save ke x?");
    }
    preProcessData(data, company) {
        try {
            return data.map((item) => ({
                name: item.name,
                type: item.type,
                company: item.company || company,
            }));
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveData(processedData) {
        for (const item of processedData) {
            const department = this.DepartmentRepository.create(item);
            await this.DepartmentRepository.save(department);
        }
    }
    async createQueryBuilder() {
        return await this.DepartmentRepository.createQueryBuilder('department');
    }
};
DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentService);
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map