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
exports.HolidayController = void 0;
const common_1 = require("@nestjs/common");
const holiday_service_1 = require("./holiday.service");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const holiday_entity_1 = require("../entities/holiday.entity");
const jwt_1 = require("@nestjs/jwt");
const general_service_1 = require("../helper/general.service");
const platform_express_1 = require("@nestjs/platform-express");
const helper_1 = require("../helper/helper");
const destinationPath = "/opt/bitnami/apache/htdocs/files/holiday";
const storages = helper_1.default.functions.createMulterStorage(destinationPath);
let HolidayController = class HolidayController {
    constructor(HolidayService, jwtService, GeneralService) {
        this.HolidayService = HolidayService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.HolidayService.findAll({});
        return response;
    }
    async byCompany(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.HolidayService.byCompany(data);
        return response;
    }
    async byCompany2(request, id) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        if (data["usertype"] == "superadmin") {
            const response = await this.HolidayService.findAll({
                where: { company: { id: id } },
            });
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async generateHoliday(post_input, getYear, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.HolidayService.generateHoliday(data, post_input, getYear);
        return response;
    }
    async findOne(id) {
        const response = await this.HolidayService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createHolidayData) {
        console.log(createHolidayData);
        const response = await this.HolidayService.create(createHolidayData);
        return response;
    }
    async update(id, updateHolidayData) {
        const response = await this.HolidayService.findOne({ where: { id: id } });
        console.log("asdkasjd");
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            console.log(updateHolidayData);
            const response2 = await this.HolidayService.update(id, updateHolidayData);
            console.log("123");
            return updateHolidayData;
        }
    }
    async delete(id) {
        const response = await this.HolidayService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.HolidayService.remove(id);
            return response;
        }
    }
    async downloadexcel(res) {
        const data = [
            {
                name: "nak cuti apa",
                description: "kena tambah reason",
                date: " 17/02/2023,  10:33:04 PM",
                company: "letak id company",
            },
        ];
        const fileNamePrefix = "template";
        const filePath = await this.GeneralService.downloadExcelData(data, fileNamePrefix);
        res.download(filePath);
    }
    async downloadExcelData(res, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.HolidayService.findAll({
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
                    field: "description",
                    format: (value) => `${value}`,
                    label: "description",
                },
                {
                    field: "date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "date",
                },
                {
                    field: "company",
                    format: (value) => `${value.name}`,
                    label: "company",
                },
            ];
            const fileNamePrefix = "Holidays";
            const filePath = await this.GeneralService.downloadExcelData(response, fileNamePrefix, columns);
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
        this.HolidayService.parseExcelFile(files, company);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("byCompany"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "byCompany", null);
__decorate([
    (0, common_1.Get)("byCompany/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "byCompany2", null);
__decorate([
    (0, common_1.Post)("generateHoliday"),
    __param(0, (0, common_1.Body)("post_input")),
    __param(1, (0, common_1.Body)("getYear")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "generateHoliday", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [holiday_entity_1.Holiday]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, holiday_entity_1.Holiday]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("/template/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "downloadexcel", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "downloadExcelData", null);
__decorate([
    (0, common_1.Post)("/excel"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storages })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], HolidayController.prototype, "uploadFile", null);
HolidayController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("holiday"),
    __metadata("design:paramtypes", [holiday_service_1.HolidayService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], HolidayController);
exports.HolidayController = HolidayController;
//# sourceMappingURL=holiday.controller.js.map