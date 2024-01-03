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
exports.TechnicianController = void 0;
const common_1 = require("@nestjs/common");
const Technician_service_1 = require("./Technician.service");
const technician_entity_1 = require("../entities/technician.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const case_entity_1 = require("../entities/case.entity");
const jwt_1 = require("@nestjs/jwt");
const notification_service_1 = require("../notification/notification.service");
const cases_gateway_1 = require("../GatewayHandler/cases.gateway");
let TechnicianController = class TechnicianController {
    constructor(TechnicianService, jwtService, notificationsService, casegateway) {
        this.TechnicianService = TechnicianService;
        this.jwtService = jwtService;
        this.notificationsService = notificationsService;
        this.casegateway = casegateway;
    }
    async fillAll() {
        const response = await this.TechnicianService.findAll({
            relations: ["maintainer", "assigner", "cases"],
        });
        return response;
    }
    async findOne(id) {
        const response = await this.TechnicianService.findOne({
            where: { id: id },
            relations: ["maintainer", "assigner", "cases"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(request, techlist, caseDetails) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        techlist.forEach(async (techinician) => {
            console.log(techinician);
            const createTechnicianeData = {
                id: null,
                maintainer: techinician,
                assigner: data,
                cases: caseDetails,
                rate: 0,
                main_hour: 0,
            };
            const response = this.TechnicianService.create(createTechnicianeData);
            let notificationdata = {
                name: "caseshistory",
                cases: caseDetails.id,
                user: techinician,
            };
            let notification = await this.notificationsService.create(notificationdata);
            this.notificationsService
                .findOne({
                where: { id: notification.id },
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
            })
                .then((noti) => {
                this.casegateway.newnotify(techinician.email, noti);
            });
        });
        return "success";
    }
    async update(id, updateTechnicianData) {
        const response = await this.TechnicianService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.TechnicianService.update(id, updateTechnicianData);
            return updateTechnicianData;
        }
    }
    async delete(id) {
        const response = await this.TechnicianService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.TechnicianService.remove(id);
            return {
                success: true,
            };
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TechnicianController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TechnicianController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("techlist")),
    __param(2, (0, common_1.Body)("caseDetails")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, case_entity_1.Case]),
    __metadata("design:returntype", Promise)
], TechnicianController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, technician_entity_1.Technician]),
    __metadata("design:returntype", Promise)
], TechnicianController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TechnicianController.prototype, "delete", null);
TechnicianController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("Technician"),
    __metadata("design:paramtypes", [Technician_service_1.TechnicianService,
        jwt_1.JwtService,
        notification_service_1.NotificationsService,
        cases_gateway_1.CasesGateway])
], TechnicianController);
exports.TechnicianController = TechnicianController;
//# sourceMappingURL=Technician.controller.js.map