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
exports.tempPpmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tempppm_entity_1 = require("../entities/tempppm.entity");
const typeorm_2 = require("typeorm");
let tempPpmService = class tempPpmService {
    constructor(tempPpmRepository) {
        this.tempPpmRepository = tempPpmRepository;
    }
    findAll() {
        return this.tempPpmRepository.find();
    }
    findtempPpm(condition) {
        return this.tempPpmRepository.find(condition);
    }
    async findOne(condition) {
        return this.tempPpmRepository.findOne(condition);
    }
    create(data) {
        return this.tempPpmRepository.save(data);
    }
    async update(id, data) {
        return this.tempPpmRepository.update(id, data);
    }
    async remove(id) {
        return this.tempPpmRepository.delete(id);
    }
    async clear() {
        return this.tempPpmRepository.clear();
    }
    async delCondition(condition) {
        return this.tempPpmRepository.delete(condition);
    }
};
tempPpmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tempppm_entity_1.tempPpm)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], tempPpmService);
exports.tempPpmService = tempPpmService;
//# sourceMappingURL=tempPpm.service.js.map