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
exports.asset_statusController = void 0;
const common_1 = require("@nestjs/common");
const asset_status_service_1 = require("./asset_status.service");
const asset_status_entity_1 = require("../entities/asset_status.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let asset_statusController = class asset_statusController {
    constructor(asset_statusService) {
        this.asset_statusService = asset_statusService;
    }
    async fillAll() {
        const response = await this.asset_statusService.findAll();
        return response;
    }
    async findOne(id) {
        const response = await this.asset_statusService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createasset_statusData) {
        const response = await this.asset_statusService.create(createasset_statusData);
        return response;
    }
    async update(id, updateasset_statusData) {
        const response = await this.asset_statusService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.asset_statusService.update(id, updateasset_statusData);
            return updateasset_statusData;
        }
    }
    async delete(id) {
        const response = await this.asset_statusService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.asset_statusService.remove(id);
            return response;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], asset_statusController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], asset_statusController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [asset_status_entity_1.Asset_Status]),
    __metadata("design:returntype", Promise)
], asset_statusController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, asset_status_entity_1.Asset_Status]),
    __metadata("design:returntype", Promise)
], asset_statusController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], asset_statusController.prototype, "delete", null);
asset_statusController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("asset_status"),
    __metadata("design:paramtypes", [asset_status_service_1.asset_statusService])
], asset_statusController);
exports.asset_statusController = asset_statusController;
//# sourceMappingURL=asset_status.controller.js.map