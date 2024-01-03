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
exports.PanelTypeController = void 0;
const common_1 = require("@nestjs/common");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const general_service_1 = require("../helper/general.service");
const helper_1 = require("../helper/helper");
const paneltype_entity_1 = require("../entities/paneltype.entity");
const paneltype_service_1 = require("../panelType/paneltype.service");
const destinationPath = "/opt/bitnami/apache/htdocs/files/Panel";
const storages = helper_1.default.functions.createMulterStorage(destinationPath);
let PanelTypeController = class PanelTypeController {
    constructor(PanelTypeService, jwtService, GeneralService) {
        this.PanelTypeService = PanelTypeService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.PanelTypeService.findAll();
        return response;
    }
    async findOne(id) {
        const response = await this.PanelTypeService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createPaneltypeData) {
        const response = await this.PanelTypeService.create(createPaneltypeData);
        return response;
    }
    async update(id, updatePanelTypeData) {
        const response = await this.PanelTypeService.findOne({
            where: { id: updatePanelTypeData.id },
        });
        console.log("updatePanelTypeData", updatePanelTypeData);
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.PanelTypeService.update(updatePanelTypeData.id, updatePanelTypeData);
            return updatePanelTypeData;
        }
    }
    async delete(id) {
        const response = await this.PanelTypeService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.PanelTypeService.remove(id);
            return response;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PanelTypeController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PanelTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paneltype_entity_1.PanelType]),
    __metadata("design:returntype", Promise)
], PanelTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, paneltype_entity_1.PanelType]),
    __metadata("design:returntype", Promise)
], PanelTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PanelTypeController.prototype, "delete", null);
PanelTypeController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("panetypel"),
    __metadata("design:paramtypes", [paneltype_service_1.PanelTypeService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], PanelTypeController);
exports.PanelTypeController = PanelTypeController;
//# sourceMappingURL=paneltype.controller.js.map