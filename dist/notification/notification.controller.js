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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const notification_service_1 = require("./notification.service");
const notification_entity_1 = require("../entities/notification.entity");
let NotificationsController = class NotificationsController {
    constructor(notificationsService, jwtService) {
        this.notificationsService = notificationsService;
        this.jwtService = jwtService;
    }
    async findall() {
        const response = await this.notificationsService.findAll();
        return response;
    }
    async findAll(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.notificationsService.finduser({
            where: { user: { id: data.id } },
            relations: [
                "cases",
                "cases.equipment",
                "cases.case_status",
                "cases.equipment.subarea",
                "cases.casetype",
                "cases.equipment.eq_type",
                "cases.equipment.eq_classification",
                "cases.equipment.eq_brand",
                "cases.equipment.eq_model",
                "cases.location.area.department",
                "casehistory",
                "casehistory.cases",
                "news",
                "news.publisher",
                "casehistory.old_status",
                "casehistory.new_status",
                "cases.equipment_type",
            ],
        });
        return response;
    }
    async findOne(id) {
        const response = await this.notificationsService.findOne({
            where: { id: id },
            relations: [
                "cases",
                "cases.equipment",
                "cases.case_status",
                "cases.equipment.subarea",
                "cases.casetype",
                "cases.equipment.eq_type",
                "cases.equipment.eq_classification",
                "cases.equipment.eq_brand",
                "cases.equipment.eq_model",
                "cases.location.area.department",
                "casehistory",
                "news",
                "news.publisher",
                "casehistory.old_status",
                "casehistory.new_status",
                "cases.equipment_type",
            ],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createNotiData) {
        const response = await this.notificationsService.create(createNotiData);
        return response;
    }
    async update(id, updateNotiData) {
        const response = await this.notificationsService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.notificationsService.update(id, updateNotiData);
            return updateNotiData;
        }
    }
    async delete(id) {
        const response = await this.notificationsService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.notificationsService.remove(id);
            return response;
        }
    }
};
__decorate([
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)("byuser"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_entity_1.Notifications]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, notification_entity_1.Notifications]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "delete", null);
NotificationsController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("notifications"),
    __metadata("design:paramtypes", [notification_service_1.NotificationsService,
        jwt_1.JwtService])
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notification.controller.js.map