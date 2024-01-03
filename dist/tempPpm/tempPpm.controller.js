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
exports.tempPpmController = void 0;
const common_1 = require("@nestjs/common");
const tempppm_entity_1 = require("../entities/tempppm.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const general_service_1 = require("../helper/general.service");
const tempPpm_service_1 = require("./tempPpm.service");
const typeorm_1 = require("typeorm");
const helper_1 = require("../helper/helper");
const destinationPath = "/opt/bitnami/apache/htdocs/files/tempPpm";
const storages = helper_1.default.functions.createMulterStorage(destinationPath);
let tempPpmController = class tempPpmController {
    constructor(tempPpmService, jwtService, GeneralService) {
        this.tempPpmService = tempPpmService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async fillAll(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.tempPpmService.findtempPpm({
            where: { equipment: { company: { user: { id: data["id"] } } } },
            relations: [
                "equipment.department",
                "equipment.subarea",
                "equipment.eq_type",
                "equipment.eq_classification",
                "equipment.eq_brand",
                "equipment.eq_model",
                "ppm",
                "equipment.subarea",
                "equipment.department",
            ],
        });
        return response;
    }
    async findOne(id) {
        const response = await this.tempPpmService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createtempPpmData) {
        const response = await this.tempPpmService.create(createtempPpmData);
        return response;
    }
    async update(id, updatetempPpmData) {
        const response = await this.tempPpmService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.tempPpmService.update(id, updatetempPpmData);
            return updatetempPpmData;
        }
    }
    async delete(id) {
        const response = await this.tempPpmService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.tempPpmService.remove(id);
            return response;
        }
    }
    async saveAll(ppmList, ppmYear, startRange, endRange) {
        let firstYear = new Date(ppmYear, 0, 1);
        let firstYear2 = Math.round(firstYear.getTime() / 1000);
        let nextYear = new Date(ppmYear + 1, 0, 1);
        let nextYear2 = Math.round(nextYear.getTime() / 1000);
        let response = null;
        let response2 = null;
        response = await this.tempPpmService.delCondition({
            request_date: (0, typeorm_1.Between)(startRange, endRange),
        });
        ppmList.forEach(async (element) => {
            response2 = await this.tempPpmService.create(element);
        });
        return {
            message: "success",
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], tempPpmController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], tempPpmController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tempppm_entity_1.tempPpm]),
    __metadata("design:returntype", Promise)
], tempPpmController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tempppm_entity_1.tempPpm]),
    __metadata("design:returntype", Promise)
], tempPpmController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], tempPpmController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("saveAll"),
    __param(0, (0, common_1.Body)("ppmList")),
    __param(1, (0, common_1.Body)("ppmYear")),
    __param(2, (0, common_1.Body)("startRange")),
    __param(3, (0, common_1.Body)("endRange")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], tempPpmController.prototype, "saveAll", null);
tempPpmController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("tempPpm"),
    __metadata("design:paramtypes", [tempPpm_service_1.tempPpmService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], tempPpmController);
exports.tempPpmController = tempPpmController;
//# sourceMappingURL=tempPpm.controller.js.map