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
exports.umdnsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const umdns_entity_1 = require("../entities/umdns.entity");
const typeorm_2 = require("typeorm");
const xlsx = require("xlsx");
const fs = require("fs");
let umdnsService = class umdnsService {
    constructor(umdnsRepository) {
        this.umdnsRepository = umdnsRepository;
    }
    findAll() {
        return this.umdnsRepository.find();
    }
    find(condition) {
        return this.umdnsRepository.find(condition);
    }
    async findOne(condition) {
        return this.umdnsRepository.findOne(condition);
    }
    create(data) {
        return this.umdnsRepository.save(data);
    }
    async update(id, data) {
        return this.umdnsRepository.update(id, data);
    }
    async remove(id) {
        return this.umdnsRepository.delete(id);
    }
    async classByCompany(userId) {
        return this.umdnsRepository.find({
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
            const eqclass = this.umdnsRepository.create(item);
            await this.umdnsRepository.save(eqclass);
        }
    }
};
umdnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(umdns_entity_1.umdns)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], umdnsService);
exports.umdnsService = umdnsService;
//# sourceMappingURL=umdns.service.js.map