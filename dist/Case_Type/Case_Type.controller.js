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
exports.CaseTypeController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const Case_Type_service_1 = require("./Case_Type.service");
const caseType_entity_1 = require("../entities/caseType.entity");
const jwt_1 = require("@nestjs/jwt");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let CaseTypeController = class CaseTypeController {
    constructor(caseTypeService, jwtService) {
        this.caseTypeService = caseTypeService;
        this.jwtService = jwtService;
    }
    async fillAll() {
        const response = await this.caseTypeService.findAll();
        return response;
    }
    async findbyUser(request) {
        try {
            let cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const response1 = await this.caseTypeService.findAllC(data.id, data.usertype);
            return response1;
        }
        catch (e) {
            console.log(e);
            throw new common_1.UnauthorizedException();
        }
    }
    async ppmType(request) {
        try {
            let cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const response1 = await this.caseTypeService.findOne({
                where: {
                    company: { user: { id: data["id"] } },
                    name: "PPM",
                },
            });
            return response1;
        }
        catch (e) {
            console.log(e);
            throw new common_1.UnauthorizedException();
        }
    }
    async transfertype(request) {
        try {
            let cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const response1 = await this.caseTypeService.findOne({
                where: {
                    company: { user: { id: data["id"] } },
                    name: "Transfer",
                },
            });
            return response1;
        }
        catch (e) {
            console.log(e);
            throw new common_1.UnauthorizedException();
        }
    }
    async findsubtask(id, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let response = [];
        if (data["usertype"] == "superadmin") {
            response = await this.caseTypeService.findCondition({
                where: { company: { id: id } },
            });
        }
        else {
            response = await this.caseTypeService.findCondition({
                where: { company: { user: { id: data["id"] } }, name: (0, typeorm_1.Not)("PPM") },
            });
        }
        return response;
    }
    async findOne(id) {
        const response = await this.caseTypeService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createcaseTypeData) {
        const response = await this.caseTypeService.create(createcaseTypeData);
        return response;
    }
    async update(id, updatecaseTypeData) {
        const response = await this.caseTypeService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.caseTypeService.update(id, updatecaseTypeData);
            return updatecaseTypeData;
        }
    }
    async delete(id) {
        const response = await this.caseTypeService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.caseTypeService.remove(id);
            return response;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaseTypeController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("byUser"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseTypeController.prototype, "findbyUser", null);
__decorate([
    (0, common_1.Get)("ppmType"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseTypeController.prototype, "ppmType", null);
__decorate([
    (0, common_1.Get)("transfertype"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseTypeController.prototype, "transfertype", null);
__decorate([
    (0, common_1.Get)("company/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CaseTypeController.prototype, "findsubtask", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CaseTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [caseType_entity_1.CaseType]),
    __metadata("design:returntype", Promise)
], CaseTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, caseType_entity_1.CaseType]),
    __metadata("design:returntype", Promise)
], CaseTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CaseTypeController.prototype, "delete", null);
CaseTypeController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("casetype"),
    __metadata("design:paramtypes", [Case_Type_service_1.CaseTypeService,
        jwt_1.JwtService])
], CaseTypeController);
exports.CaseTypeController = CaseTypeController;
//# sourceMappingURL=Case_Type.controller.js.map