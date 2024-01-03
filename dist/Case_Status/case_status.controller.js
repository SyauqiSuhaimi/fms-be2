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
exports.Case_StatusController = void 0;
const common_1 = require("@nestjs/common");
const case_status_service_1 = require("./case_status.service");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const case_status_entity_1 = require("../entities/case_status.entity");
let Case_StatusController = class Case_StatusController {
    constructor(Case_StatusService) {
        this.Case_StatusService = Case_StatusService;
    }
    async fillAll() {
        const response = await this.Case_StatusService.findAll({});
        return response;
    }
    async findOne(id) {
        const response = await this.Case_StatusService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(Case_StatusData) {
        const response = await this.Case_StatusService.create(Case_StatusData);
        return response;
    }
    async update(id, Case_StatusData) {
        const response = await this.Case_StatusService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.Case_StatusService.update(id, Case_StatusData);
            return Case_StatusData;
        }
    }
    async delete(id) {
        const response = await this.Case_StatusService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.Case_StatusService.remove(id);
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
], Case_StatusController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Case_StatusController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_status_entity_1.Case_Status]),
    __metadata("design:returntype", Promise)
], Case_StatusController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, case_status_entity_1.Case_Status]),
    __metadata("design:returntype", Promise)
], Case_StatusController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Case_StatusController.prototype, "delete", null);
Case_StatusController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("case_status"),
    __metadata("design:paramtypes", [case_status_service_1.Case_StatusService])
], Case_StatusController);
exports.Case_StatusController = Case_StatusController;
//# sourceMappingURL=case_status.controller.js.map