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
exports.PanelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const panel_entity_1 = require("../entities/panel.entity");
const typeorm_2 = require("typeorm");
let PanelService = class PanelService {
    constructor(PanelRepository) {
        this.PanelRepository = PanelRepository;
    }
    findAll() {
        return this.PanelRepository.find();
    }
    findCompany(condition) {
        return this.PanelRepository.find(condition);
    }
    async findOne(condition) {
        return this.PanelRepository.findOne(condition);
    }
    create(cases) {
        return this.PanelRepository.save(cases);
    }
    async update(id, data) {
        return this.PanelRepository.update(id, data);
    }
    async remove(id) {
        return this.PanelRepository.delete(id);
    }
};
PanelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(panel_entity_1.Panel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PanelService);
exports.PanelService = PanelService;
//# sourceMappingURL=panel.service.js.map