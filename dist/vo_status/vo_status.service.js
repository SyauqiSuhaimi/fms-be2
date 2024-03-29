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
exports.vo_statusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vo_status_entity_1 = require("../entities/vo_status.entity");
const typeorm_2 = require("typeorm");
let vo_statusService = class vo_statusService {
    constructor(vo_statusRepository) {
        this.vo_statusRepository = vo_statusRepository;
    }
    findAll() {
        return this.vo_statusRepository.find();
    }
    async findOne(condition) {
        return this.vo_statusRepository.findOne(condition);
    }
    async find(condition) {
        return this.vo_statusRepository.find(condition);
    }
    create(data) {
        return this.vo_statusRepository.save(data);
    }
    async update(id, data) {
        return this.vo_statusRepository.update(id, data);
    }
    async remove(id) {
        return this.vo_statusRepository.delete(id);
    }
};
vo_statusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vo_status_entity_1.vo_status)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], vo_statusService);
exports.vo_statusService = vo_statusService;
//# sourceMappingURL=vo_status.service.js.map