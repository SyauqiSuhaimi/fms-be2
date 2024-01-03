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
exports.PPMController = void 0;
const common_1 = require("@nestjs/common");
const ppm_service_1 = require("./ppm.service");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const ppm_entity_1 = require("../entities/ppm.entity");
const jwt_1 = require("@nestjs/jwt");
const general_service_1 = require("../helper/general.service");
const platform_express_1 = require("@nestjs/platform-express");
const helper_1 = require("../helper/helper");
const destinationPath = "/opt/bitnami/apache/htdocs/files/ppm";
const storages = helper_1.default.functions.createMulterStorage(destinationPath);
let PPMController = class PPMController {
    constructor(PpmService, jwtService, GeneralService) {
        this.PpmService = PpmService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.PpmService.findAll({
            relations: ["ppmchecklist"],
        });
        return response;
    }
    async findOne(id) {
        const response = await this.PpmService.findOne({});
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createPpmData) {
        const response = await this.PpmService.create(createPpmData);
        return response;
    }
    async update(id, updatePpmData) {
        const response = await this.PpmService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.PpmService.update(id, updatePpmData);
            return updatePpmData;
        }
    }
    async delete(id) {
        const response = await this.PpmService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.PpmService.remove(id);
            return response;
        }
    }
    async dataForPPM(request, formBody) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.PpmService.dataForPPM(data, formBody.eqlist);
        return response;
    }
    async downloadexcel(res) {
        const data = [
            {
                name: "PPM",
                description: "",
                interval: "30/06/1970,  7:30:00 AM",
                onholiday: "",
                task: "",
                start_date: "0",
                priority: "0",
                replaceable: "true or false",
                expected_duration: "0",
                precision: "daily",
            },
        ];
        const fileNamePrefix = "template";
        const filePath = await this.GeneralService.downloadExcelData(data, fileNamePrefix);
        res.download(filePath);
    }
    epochtodate(d) {
        let tempdate = new Date(d * 1000);
        let year = tempdate.getFullYear();
        let month = (tempdate.getMonth() + 1).toString().padStart(2, "0");
        let day = tempdate.getDate().toString().padStart(2, "0");
        let str = `${day}/${month}/${year}`;
        let hours = tempdate.getHours();
        let minutes = tempdate.getMinutes().toString().padStart(2, "0");
        let seconds = tempdate.getSeconds().toString().padStart(2, "0");
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        let timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;
        return `${str},  ${timeStr}`;
    }
    async downloadExcelData(res) {
        const data = await this.PpmService.findAll({});
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
                field: "description",
                format: (value) => `${value ? value.name : ""}`,
                label: "description",
            },
            {
                field: "interval",
                format: (value) => `${this.epochtodate(value)}`,
                label: "interval",
            },
            {
                field: "onholiday",
                format: (value) => `${value}`,
                label: "onholiday",
            },
            {
                field: "task",
                format: (value) => `${value ? value.name : ""}`,
                label: "task",
            },
            {
                field: "start_date",
                format: (value) => `${value}`,
                label: "start_date",
            },
            {
                field: "priority",
                format: (value) => `${value}`,
                label: "priority",
            },
            {
                field: "replaceable",
                format: (value) => `${value}`,
                label: "replaceable",
            },
            {
                field: "expected_duration",
                format: (value) => `${value}`,
                label: "expected_duration",
            },
            {
                field: "precision",
                format: (value) => `${value}`,
                label: "precision",
            },
        ];
        const fileNamePrefix = "PPM";
        const filePath = await this.GeneralService.downloadExcelData(data, fileNamePrefix, columns);
        res.download(filePath);
    }
    async uploadFile(body, files) {
        if (files) {
            const file = files[0];
            const filename = file.filename;
            console.log(filename, "test filename");
        }
        console.log(files, "sini ade ape pulak");
        this.PpmService.parseExcelFile(files);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PPMController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PPMController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ppm_entity_1.PPM]),
    __metadata("design:returntype", Promise)
], PPMController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ppm_entity_1.PPM]),
    __metadata("design:returntype", Promise)
], PPMController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PPMController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("dataforppm"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PPMController.prototype, "dataForPPM", null);
__decorate([
    (0, common_1.Get)("/template/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PPMController.prototype, "downloadexcel", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PPMController.prototype, "downloadExcelData", null);
__decorate([
    (0, common_1.Post)("/excel"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storages })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PPMController.prototype, "uploadFile", null);
PPMController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("ppm"),
    __metadata("design:paramtypes", [ppm_service_1.PPMService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], PPMController);
exports.PPMController = PPMController;
//# sourceMappingURL=ppm.controller.js.map