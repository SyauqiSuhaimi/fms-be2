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
exports.ppmChecklistController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const ppmChecklist_entity_1 = require("../entities/ppmChecklist.entity");
const general_service_1 = require("../helper/general.service");
const ppmChecklist_service_1 = require("./ppmChecklist.service");
const helper_1 = require("../helper/helper");
const destinationPath = "/opt/bitnami/apache/htdocs/files/ppmChecklist";
const storage = helper_1.default.functions.createMulterStorage(destinationPath);
let ppmChecklistController = class ppmChecklistController {
    constructor(ppmChecklistService, jwtService, GeneralService) {
        this.ppmChecklistService = ppmChecklistService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async findAll(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.ppmChecklistService.findCase({
            where: { company: { user: { id: data.id } } },
            relations: ["uploader"],
        });
        response.forEach((item) => delete item.uploader.password);
        return response;
    }
    async findOne(id) {
        const response = await this.ppmChecklistService.findOne({
            where: { id: id },
        });
        delete response.uploader.password;
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async update(id, updateCaseData) {
        const response = await this.ppmChecklistService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.ppmChecklistService.update(id, updateCaseData);
            return updateCaseData;
        }
    }
    async delete(id) {
        const response = await this.ppmChecklistService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.ppmChecklistService.remove(id);
            return response;
        }
    }
    createcase(body, files) {
        console.log("create2");
        files.forEach(async (file) => {
            const data = {
                ...body,
                path: file.filename,
                name: file.originalname,
            };
            await this.ppmChecklistService.create(data);
        });
        console.log("create3");
        return "Files Upload";
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ppmChecklistController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ppmChecklistController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ppmChecklist_entity_1.ppmChecklist]),
    __metadata("design:returntype", Promise)
], ppmChecklistController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ppmChecklistController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 20, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], ppmChecklistController.prototype, "createcase", null);
ppmChecklistController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("ppmchecklist"),
    __metadata("design:paramtypes", [ppmChecklist_service_1.ppmChecklistService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], ppmChecklistController);
exports.ppmChecklistController = ppmChecklistController;
//# sourceMappingURL=ppmChecklist.controller.js.map