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
exports.GroupCompanyController = void 0;
const common_1 = require("@nestjs/common");
const group_company_service_1 = require("./group_company.service");
const groupCompany_entity_1 = require("../entities/groupCompany.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let GroupCompanyController = class GroupCompanyController {
    constructor(groupCompanyService) {
        this.groupCompanyService = groupCompanyService;
    }
    async fillAll() {
        const response = await this.groupCompanyService.findAll();
        return response;
    }
    async findOne(id) {
        const response = await this.groupCompanyService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createGroupCompanyData) {
        const response = await this.groupCompanyService.create(createGroupCompanyData);
        return response;
    }
    async update(id, updateGroupCompanyData) {
        const response = await this.groupCompanyService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.groupCompanyService.update(id, updateGroupCompanyData);
            return updateGroupCompanyData;
        }
    }
    async delete(id) {
        const response = await this.groupCompanyService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.groupCompanyService.remove(id);
            return response;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupCompanyController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupCompanyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [groupCompany_entity_1.GroupCompany]),
    __metadata("design:returntype", Promise)
], GroupCompanyController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, groupCompany_entity_1.GroupCompany]),
    __metadata("design:returntype", Promise)
], GroupCompanyController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupCompanyController.prototype, "delete", null);
GroupCompanyController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("groupcompany"),
    __metadata("design:paramtypes", [group_company_service_1.GroupCompanyService])
], GroupCompanyController);
exports.GroupCompanyController = GroupCompanyController;
//# sourceMappingURL=group_company.controller.js.map