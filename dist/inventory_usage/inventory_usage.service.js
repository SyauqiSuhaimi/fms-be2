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
exports.Inventory_UsageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_usage_entity_1 = require("../entities/inventory_usage.entity");
let Inventory_UsageService = class Inventory_UsageService {
    constructor(InventoryHistoryRepository) {
        this.InventoryHistoryRepository = InventoryHistoryRepository;
    }
    findAll() {
        return this.InventoryHistoryRepository.find();
    }
    findInventoryusage(condition) {
        return this.InventoryHistoryRepository.find(condition);
    }
    async findOne(condition) {
        return this.InventoryHistoryRepository.findOne(condition);
    }
    create(data) {
        return this.InventoryHistoryRepository.save(data);
    }
    async update(id, data) {
        return this.InventoryHistoryRepository.save(data);
    }
    async remove(id) {
        return this.InventoryHistoryRepository.delete(id);
    }
};
Inventory_UsageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_usage_entity_1.Inventory_Usage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], Inventory_UsageService);
exports.Inventory_UsageService = Inventory_UsageService;
//# sourceMappingURL=inventory_usage.service.js.map