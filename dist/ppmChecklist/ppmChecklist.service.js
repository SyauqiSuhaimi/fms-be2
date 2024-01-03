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
exports.ppmChecklistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ppmChecklist_entity_1 = require("../entities/ppmChecklist.entity");
let ppmChecklistService = class ppmChecklistService {
    constructor(ppmChecklistRepository) {
        this.ppmChecklistRepository = ppmChecklistRepository;
    }
    findAll(condition = {}) {
        return this.ppmChecklistRepository.find(condition);
    }
    async findCase(condition) {
        return this.ppmChecklistRepository.find(condition);
    }
    async findUnassigned(condition) {
        return this.ppmChecklistRepository.query(condition);
    }
    async findOne(condition) {
        return this.ppmChecklistRepository.findOne(condition);
    }
    create(data) {
        return this.ppmChecklistRepository.save(data);
    }
    async update(id, data) {
        return this.ppmChecklistRepository.update(id, data);
    }
    async remove(id) {
        return this.ppmChecklistRepository.delete(id);
    }
    async ppmChecklistByCompany(userId) {
        const response = await this.ppmChecklistRepository.find({
            where: { company: { user: { id: userId["id"] } } },
            relations: ["uploader"],
        });
        response.forEach((item) => delete item.uploader.password);
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
};
ppmChecklistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ppmChecklist_entity_1.ppmChecklist)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ppmChecklistService);
exports.ppmChecklistService = ppmChecklistService;
//# sourceMappingURL=ppmChecklist.service.js.map