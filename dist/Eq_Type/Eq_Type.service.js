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
exports.Eq_TypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const eq_type_entity_1 = require("../entities/eq_type.entity");
const typeorm_2 = require("typeorm");
const xlsx = require("xlsx");
const fs = require("fs");
let Eq_TypeService = class Eq_TypeService {
    constructor(Eq_TypeRepository) {
        this.Eq_TypeRepository = Eq_TypeRepository;
    }
    findAll() {
        return this.Eq_TypeRepository.find();
    }
    findEq_Type(condition) {
        return this.Eq_TypeRepository.find(condition);
    }
    async findOne(condition) {
        return this.Eq_TypeRepository.findOne(condition);
    }
    create(data) {
        return this.Eq_TypeRepository.save(data);
    }
    async update(data) {
        return this.Eq_TypeRepository.save(data);
    }
    async remove(id) {
        return this.Eq_TypeRepository.delete(id);
    }
    async typeByCompany(userId) {
        return this.Eq_TypeRepository.find({
            where: { company: { user: { id: userId["id"] } } },
        });
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
                company: item.company || company,
            }));
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveData(processedData) {
        for (const item of processedData) {
            const eqtype = this.Eq_TypeRepository.create(item);
            await this.Eq_TypeRepository.save(eqtype);
        }
    }
};
Eq_TypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(eq_type_entity_1.Eq_Type)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], Eq_TypeService);
exports.Eq_TypeService = Eq_TypeService;
//# sourceMappingURL=Eq_Type.service.js.map