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
exports.subtaskController = void 0;
const common_1 = require("@nestjs/common");
const subtask_service_1 = require("./subtask.service");
const subtask_entity_1 = require("../entities/subtask.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const general_service_1 = require("../helper/general.service");
const helper_1 = require("../helper/helper");
const tasktype_service_1 = require("../tasktype/tasktype.service");
const destinationPath = "/opt/bitnami/apache/htdocs/files/subtask";
const storages = helper_1.default.functions.createMulterStorage(destinationPath);
let subtaskController = class subtaskController {
    constructor(subtaskService, jwtService, GeneralService, tasktypeService) {
        this.subtaskService = subtaskService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
        this.tasktypeService = tasktypeService;
    }
    async fillAll() {
        const response = await this.subtaskService.findAll();
        return response;
    }
    async findsubtask(id, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let response = [];
        let tasktypeList = [];
        if (data["usertype"] == "superadmin") {
            response = await this.subtaskService.findsubtask({
                where: { company: { id: id } },
                relations: ["tasktype"],
            });
            tasktypeList = await this.tasktypeService.findtasktype({
                where: { company: { id: id } },
            });
        }
        else {
            response = await this.subtaskService.findsubtask({
                where: { company: { user: { id: data["id"] } } },
                relations: ["tasktype"],
            });
            tasktypeList = await this.tasktypeService.findtasktype({
                where: { company: { user: { id: data["id"] } } },
            });
        }
        return { response: response, tasktypeList: tasktypeList };
    }
    async findOne(id) {
        const response = await this.subtaskService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createData) {
        const response = await this.subtaskService.create(createData);
        return response;
    }
    async update(id, updateData) {
        const response = await this.subtaskService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.subtaskService.update(id, updateData);
            return updateData;
        }
    }
    async delete(id) {
        const response = await this.subtaskService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.subtaskService.remove(id);
            return response;
        }
    }
    async downloadexcel(res) {
        const data = [
            {
                name: "bilik 1",
                area: "1",
            },
        ];
        const fileNamePrefix = "template";
        const filePath = await this.GeneralService.downloadExcelData(data, fileNamePrefix);
        res.download(filePath);
    }
    async downloadExcelData(res, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.subtaskService.findsubtask({
            where: { area: { company: { user: { id: data["id"] } } } },
            relations: ["area", "area.company"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const fileNamePrefix = "subtask";
            const filePath = await this.GeneralService.downloadExcelData(response, fileNamePrefix);
            res.download(filePath);
        }
    }
    async uploadFile(body, files) {
        if (files) {
            const file = files[0];
            const filename = file.filename;
            console.log(filename, "test filename");
        }
        console.log(files, "sini ade ape pulak");
        this.subtaskService.parseExcelFile(files);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], subtaskController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("company/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], subtaskController.prototype, "findsubtask", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], subtaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subtask_entity_1.Subtask]),
    __metadata("design:returntype", Promise)
], subtaskController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, subtask_entity_1.Subtask]),
    __metadata("design:returntype", Promise)
], subtaskController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], subtaskController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("/template/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], subtaskController.prototype, "downloadexcel", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], subtaskController.prototype, "downloadExcelData", null);
__decorate([
    (0, common_1.Post)("/excel"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storages })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], subtaskController.prototype, "uploadFile", null);
subtaskController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("subtask"),
    __metadata("design:paramtypes", [subtask_service_1.subtaskService,
        jwt_1.JwtService,
        general_service_1.GeneralService,
        tasktype_service_1.tasktypeService])
], subtaskController);
exports.subtaskController = subtaskController;
//# sourceMappingURL=subtask.controller.js.map