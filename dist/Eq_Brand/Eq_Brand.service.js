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
exports.Eq_BrandService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const eq_brand_entity_1 = require("../entities/eq_brand.entity");
const typeorm_2 = require("typeorm");
let Eq_BrandService = class Eq_BrandService {
    constructor(Eq_BrandRepository) {
        this.Eq_BrandRepository = Eq_BrandRepository;
    }
    findAll() {
        return this.Eq_BrandRepository.find();
    }
    findEq_Brand(condition) {
        return this.Eq_BrandRepository.find(condition);
    }
    async findOne(condition) {
        return this.Eq_BrandRepository.findOne(condition);
    }
    create(data) {
        return this.Eq_BrandRepository.save(data);
    }
    async update(id, data) {
        return this.Eq_BrandRepository.update(id, data);
    }
    async remove(id) {
        return this.Eq_BrandRepository.delete(id);
    }
    async brandByCompany(userId) {
        return this.Eq_BrandRepository.find({
            where: { company: { user: { id: userId["id"] } } },
            relations: ["eq_model"],
        });
    }
};
Eq_BrandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(eq_brand_entity_1.Eq_Brand)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], Eq_BrandService);
exports.Eq_BrandService = Eq_BrandService;
//# sourceMappingURL=Eq_Brand.service.js.map