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
exports.CaseHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const caseHistory_entity_1 = require("../entities/caseHistory.entity");
const typeorm_2 = require("typeorm");
let CaseHistoryService = class CaseHistoryService {
    constructor(CaseHistoryRepository) {
        this.CaseHistoryRepository = CaseHistoryRepository;
    }
    findAll() {
        return this.CaseHistoryRepository.find();
    }
    async findOne(condition) {
        return this.CaseHistoryRepository.findOne(condition);
    }
    create(data) {
        return this.CaseHistoryRepository.save(data);
    }
    async update(id, data) {
        return this.CaseHistoryRepository.update(id, data);
    }
    async remove(id) {
        return this.CaseHistoryRepository.delete(id);
    }
    async getCostsForCase(cases) {
        const qb = this.CaseHistoryRepository.createQueryBuilder("casehistory");
        const result = await qb
            .select("SUM(casehistory.vendor_cost)", "vendor_cost")
            .addSelect("SUM(casehistory.material_cost)", "material_cost")
            .addSelect("SUM(casehistory.labour_cost)", "labour_cost")
            .addSelect("SUM(casehistory.vendor_cost + casehistory.material_cost + casehistory.labour_cost)", "cost")
            .where("casehistory.cases = :cases", { cases })
            .getRawOne();
        console.log(result.cost, "cost");
        return {
            vendor_cost: result.vendor_cost || 0,
            material_cost: result.material_cost || 0,
            labour_cost: result.labour_cost || 0,
            cost: result.cost || 0,
        };
    }
};
CaseHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(caseHistory_entity_1.CaseHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CaseHistoryService);
exports.CaseHistoryService = CaseHistoryService;
//# sourceMappingURL=Case_History.service.js.map