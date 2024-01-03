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
exports.projectController = void 0;
const common_1 = require("@nestjs/common");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const project_service_1 = require("./project.service");
const project_entity_1 = require("../entities/project.entity");
let projectController = class projectController {
    constructor(projectService, jwtService) {
        this.projectService = projectService;
        this.jwtService = jwtService;
    }
    async fillAll() {
        const response = await this.projectService.findCompany({});
        return response;
    }
    async findOne(id) {
        const response = await this.projectService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createprojectData) {
        const response = await this.projectService.create(createprojectData);
        return response;
    }
    async update(id, createprojectData) {
        console.log("test");
        console.log(createprojectData);
        const response = await this.projectService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.projectService.update(id, createprojectData);
            return createprojectData;
        }
    }
    async delete(id) {
        const response = await this.projectService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.projectService.remove(id);
            return response;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], projectController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], projectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_entity_1.project]),
    __metadata("design:returntype", Promise)
], projectController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, project_entity_1.project]),
    __metadata("design:returntype", Promise)
], projectController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], projectController.prototype, "delete", null);
projectController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("project"),
    __metadata("design:paramtypes", [project_service_1.projectService,
        jwt_1.JwtService])
], projectController);
exports.projectController = projectController;
//# sourceMappingURL=project.controller.js.map