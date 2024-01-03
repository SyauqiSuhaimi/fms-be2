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
exports.AreaController = void 0;
const common_1 = require("@nestjs/common");
const Area_service_1 = require("./Area.service");
const area_entity_1 = require("../entities/area.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_1 = require("@nestjs/jwt");
const general_service_1 = require("../helper/general.service");
const helper_1 = require("../helper/helper");
const destinationPath = "/opt/bitnami/apache/htdocs/files/area";
const storages = helper_1.default.functions.createMulterStorage(destinationPath);
let AreaController = class AreaController {
    constructor(areaService, jwtService, GeneralService) {
        this.areaService = areaService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async findAll() {
        const response = await this.areaService.findArea({
            relations: ["department", "company", "subarea"],
        });
        return response;
    }
    async findArea(id) {
        const response = await this.areaService.findArea({
            where: { company: { id: id } },
            relations: ["department", "company", "subarea"],
        });
        return response;
    }
    async findOne(id) {
        const response = await this.areaService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createAreaData) {
        const response = await this.areaService.create(createAreaData);
        return response;
    }
    async update(id, updateAreaData) {
        const response = await this.areaService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.areaService.update(id, updateAreaData);
            return updateAreaData;
        }
    }
    async delete(id) {
        const response = await this.areaService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            try {
                const response = await this.areaService.remove(id);
                return {
                    affected: 1,
                };
            }
            catch (error) {
                throw error;
            }
        }
    }
    async downloadexcel(res) {
        const data = [
            {
                code: "LOC0000",
                name: "Bangunan Bedah",
                type: "Building",
                department: "6",
                subarea: "",
            },
        ];
        const fileNamePrefix = "template";
        const filePath = await this.GeneralService.downloadExcelData(data, fileNamePrefix);
        res.download(filePath);
    }
    async downloadExcelData(res, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.areaService.findArea({
            where: { company: { user: { id: data["id"] } } },
            relations: ["department", "subarea", "company"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const fileNamePrefix = "area";
            const filePath = await this.GeneralService.downloadExcelData(response, fileNamePrefix);
            res.download(filePath);
        }
    }
    async uploadFile(body, files, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        if (files) {
            const file = files[0];
            const filename = file.filename;
            console.log(filename, "test filename");
        }
        console.log(files, "sini ade ape pulak");
        console.log(data, "sini tgk token");
        const company = data.company;
        console.log(company, "sini company from controller");
        this.areaService.parseExcelFile(files, company);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("company/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "findArea", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_entity_1.Area]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, area_entity_1.Area]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("/template/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "downloadexcel", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "downloadExcelData", null);
__decorate([
    (0, common_1.Post)("/excel"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storages })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "uploadFile", null);
AreaController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("area"),
    __metadata("design:paramtypes", [Area_service_1.AreaService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], AreaController);
exports.AreaController = AreaController;
//# sourceMappingURL=Area.controller.js.map