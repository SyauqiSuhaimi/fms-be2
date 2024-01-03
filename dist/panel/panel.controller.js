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
exports.PanelController = void 0;
const common_1 = require("@nestjs/common");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const panel_service_1 = require("./panel.service");
const panel_entity_1 = require("../entities/panel.entity");
let PanelController = class PanelController {
    constructor(PanelService, jwtService) {
        this.PanelService = PanelService;
        this.jwtService = jwtService;
    }
    async fillAll() {
        const response = await this.PanelService.findCompany({
            relations: ["department", "usertype"],
        });
        return response;
    }
    async fillAlldata(id) {
        const response = await this.PanelService.findCompany({
            where: { id: id },
            relations: [
                "department",
                "group",
                "servicecontract",
                "area",
                "grouplist",
                "worktrade",
                "usertype",
                "user",
                "holiday",
                "news",
            ],
        });
        console.log(response, "data company");
        return response;
    }
    async findOne(id) {
        const response = await this.PanelService.findOne({
            where: { id: id },
            relations: ["department", "equipment"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async findbyUser(request) {
        console.log("test");
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        console.log(data["id"]);
        const response = await this.PanelService.findOne({
            where: { user: { id: data["id"] } },
            relations: ["department", "equipment"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createPanelData) {
        const response = await this.PanelService.create(createPanelData);
        return response;
    }
    async update(id, createPanelData) {
        console.log("test");
        console.log(createPanelData);
        const response = await this.PanelService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.PanelService.update(id, createPanelData);
            return createPanelData;
        }
    }
    async delete(id) {
        const response = await this.PanelService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.PanelService.remove(id);
            return response;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("alldata/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "fillAlldata", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("user"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "findbyUser", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [panel_entity_1.Panel]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, panel_entity_1.Panel]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "delete", null);
PanelController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("panel"),
    __metadata("design:paramtypes", [panel_service_1.PanelService,
        jwt_1.JwtService])
], PanelController);
exports.PanelController = PanelController;
//# sourceMappingURL=panel.controller.js.map