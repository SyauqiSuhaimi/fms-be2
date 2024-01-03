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
exports.asset_statusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const asset_status_entity_1 = require("../entities/asset_status.entity");
const typeorm_2 = require("typeorm");
let asset_statusService = class asset_statusService {
    constructor(asset_statusRepository) {
        this.asset_statusRepository = asset_statusRepository;
    }
    findAll() {
        return this.asset_statusRepository.find();
    }
    async findOne(condition) {
        return this.asset_statusRepository.findOne(condition);
    }
    create(data) {
        return this.asset_statusRepository.save(data);
    }
    async update(id, data) {
        return this.asset_statusRepository.update(id, data);
    }
    async remove(id) {
        return this.asset_statusRepository.delete(id);
    }
};
asset_statusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(asset_status_entity_1.Asset_Status)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], asset_statusService);
exports.asset_statusService = asset_statusService;
//# sourceMappingURL=asset_status.service.js.map