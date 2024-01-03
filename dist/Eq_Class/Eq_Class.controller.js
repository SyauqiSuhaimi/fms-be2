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
exports.Eq_ClassController = void 0;
const common_1 = require("@nestjs/common");
const Eq_Class_service_1 = require("./Eq_Class.service");
const eq_classification_entity_1 = require("../entities/eq_classification.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const general_service_1 = require("../helper/general.service");
const dataEqC_1 = require("./dataEqC");
const helper_1 = require("../helper/helper");
const destinationPath = "/opt/bitnami/apache/htdocs/files/eqclass";
const storages = helper_1.default.functions.createMulterStorage(destinationPath);
let Eq_ClassController = class Eq_ClassController {
    constructor(Eq_ClassService, jwtService, GeneralService) {
        this.Eq_ClassService = Eq_ClassService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.Eq_ClassService.findAll();
        return response;
    }
    async findEq_Class(id) {
        const response = await this.Eq_ClassService.findEq_Class({
            where: { company: { id: id } },
        });
        return response;
    }
    async findOne(id) {
        const response = await this.Eq_ClassService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createEq_ClassData) {
        const response = await this.Eq_ClassService.create(createEq_ClassData);
        return response;
    }
    async update(id, updateEq_ClassData) {
        const response = await this.Eq_ClassService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.Eq_ClassService.update(id, updateEq_ClassData);
            return updateEq_ClassData;
        }
    }
    async delete(id) {
        const response = await this.Eq_ClassService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.Eq_ClassService.remove(id);
            return response;
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
        this.Eq_ClassService.parseExcelFile(files, company);
    }
    async downloadExcelData(res, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.Eq_ClassService.findEq_Class({
            where: { company: { user: { id: data["id"] } } },
            relations: ["company"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            let columns = [
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "name",
                    format: (value) => `${value}`,
                    label: "name",
                },
                {
                    field: "company",
                    format: (value) => `${value.name}`,
                    label: "company",
                },
            ];
            const fileNamePrefix = "EQClass";
            const filePath = await this.GeneralService.downloadExcelData(response, fileNamePrefix, columns);
            res.download(filePath);
        }
    }
    async downloadexcel(res) {
        if (!dataEqC_1.data) {
            throw new common_1.NotFoundException("no data download");
        }
        const fileNamePrefix = "template";
        const filePath = await this.GeneralService.downloadExcelData(dataEqC_1.data, fileNamePrefix);
        res.download(filePath);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Eq_ClassController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("company/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Eq_ClassController.prototype, "findEq_Class", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Eq_ClassController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [eq_classification_entity_1.Eq_Classifications]),
    __metadata("design:returntype", Promise)
], Eq_ClassController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, eq_classification_entity_1.Eq_Classifications]),
    __metadata("design:returntype", Promise)
], Eq_ClassController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Eq_ClassController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("/excel"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storages })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], Eq_ClassController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Eq_ClassController.prototype, "downloadExcelData", null);
__decorate([
    (0, common_1.Get)("/template/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Eq_ClassController.prototype, "downloadexcel", null);
Eq_ClassController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("eq_class"),
    __metadata("design:paramtypes", [Eq_Class_service_1.Eq_ClassService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], Eq_ClassController);
exports.Eq_ClassController = Eq_ClassController;
//# sourceMappingURL=Eq_Class.controller.js.map