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
exports.equipment_statusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const equipment_status_entity_1 = require("../entities/equipment_status.entity");
const typeorm_2 = require("typeorm");
let equipment_statusService = class equipment_statusService {
    constructor(equipment_statusRepository) {
        this.equipment_statusRepository = equipment_statusRepository;
    }
    findAll() {
        return this.equipment_statusRepository.find();
    }
    async findOne(condition) {
        return this.equipment_statusRepository.findOne(condition);
    }
    create(data) {
        return this.equipment_statusRepository.save(data);
    }
    async update(id, data) {
        return this.equipment_statusRepository.update(id, data);
    }
    async remove(id) {
        return this.equipment_statusRepository.delete(id);
    }
};
equipment_statusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_status_entity_1.Equipment_Status)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], equipment_statusService);
exports.equipment_statusService = equipment_statusService;
//# sourceMappingURL=equipment_status.service.js.map