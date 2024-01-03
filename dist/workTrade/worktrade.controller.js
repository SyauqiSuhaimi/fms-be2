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
exports.WorkTradeController = void 0;
const common_1 = require("@nestjs/common");
const worktrade_service_1 = require("./worktrade.service");
const workTrade_entity_1 = require("../entities/workTrade.entity");
const jwt_1 = require("@nestjs/jwt");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const general_service_1 = require("../helper/general.service");
const platform_express_1 = require("@nestjs/platform-express");
const helper_1 = require("../helper/helper");
const destinationPath = "/opt/bitnami/apache/htdocs/files/worktrade";
const storages = helper_1.default.functions.createMulterStorage(destinationPath);
let WorkTradeController = class WorkTradeController {
    constructor(WorkTradeService, jwtService, GeneralService) {
        this.WorkTradeService = WorkTradeService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.WorkTradeService.findAll({});
        return response;
    }
    async findOne(id) {
        const response = await this.WorkTradeService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createWorkTradeData) {
        const response = await this.WorkTradeService.create(createWorkTradeData);
        return response;
    }
    async update(id, updateWorkTradeData) {
        const response = await this.WorkTradeService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.WorkTradeService.update(id, updateWorkTradeData);
            return response2;
        }
    }
    async delete(id) {
        const response = await this.WorkTradeService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.WorkTradeService.remove(id);
            return response;
        }
    }
    async getbyuserID(request) {
        const cookie = request["cookies"]["jwt"];
        const data = this.jwtService.verify(cookie);
        if (!data) {
            throw new common_1.UnauthorizedException();
        }
        const response = await this.WorkTradeService.getbyuserID(data.id);
        return response;
    }
    async byCompany(id) {
        const response = await this.WorkTradeService.findMany({
            where: { company: { id: id } },
            relations: ["grouplist", "eq_type"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async byUser(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.WorkTradeService.findMany({
            where: { company: { user: { id: data["id"] } } },
            relations: ["grouplist", "eq_type"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async downloadexcel(res) {
        const data = [
            {
                name: "Electrical",
            },
        ];
        const fileNamePrefix = "template";
        const filePath = await this.GeneralService.downloadExcelData(data, fileNamePrefix);
        res.download(filePath);
    }
    async downloadExcelData(res, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.WorkTradeService.findMany({
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
            const fileNamePrefix = "Worktrade";
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
        this.WorkTradeService.parseExcelFile(files, company);
    }
    async getdata(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        console.log(data);
        const response = await this.WorkTradeService.findMany({
            where: {
                company: {
                    user: {
                        id: data["id"],
                    },
                },
            },
            relations: [
                "company",
                "groupmain",
            ],
        });
        const report = {};
        console.log("response", response);
        response
            .flatMap((item) => item.groupmain || [])
            .flatMap((group) => group.eqtype || [])
            .forEach((eqTypeItem) => {
            const ppmchecklist = eqTypeItem.ppmchecklist || [];
            ppmchecklist.forEach((ppmchecklistItem) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                const ppmArray = ppmchecklistItem.ppm || [];
                const contractValue = ((_b = (_a = ppmchecklistItem.serviceContract) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.contract_value) || 0;
                const deductionPercentage = ((_f = (_e = (_d = (_c = ppmArray[0]) === null || _c === void 0 ? void 0 : _c.cases[0]) === null || _d === void 0 ? void 0 : _d.rating) === null || _e === void 0 ? void 0 : _e.deduction) === null || _f === void 0 ? void 0 : _f.percentage) || 0;
                const deductPer = (-1 * contractValue * deductionPercentage) / 100;
                const payablefee = contractValue + deductPer;
                const frequencyForFiveYears = 5 * (365.25 / (((_g = ppmArray[0]) === null || _g === void 0 ? void 0 : _g.interval) / (24 * 60 * 60)) || 0);
                console.log((_h = ppmArray[0]) === null || _h === void 0 ? void 0 : _h.interval);
                const reportItem = {
                    "No.": "a",
                    Indicators: ppmchecklistItem.name,
                    "Checklist Ref. No.": ppmchecklistItem.referenceNo,
                    "Frequency for 5 Years": Math.round(frequencyForFiveYears),
                    "Payment Fee for 5 Years (RM)": contractValue * Math.round(frequencyForFiveYears),
                    Quantity: 1,
                    "Unit (Unit / Lot / Nos)": "Lot",
                    "Quantity of Checklist by Department / Block / Nos (Planned)": 2,
                    "Quantity of Checklist by Department / Block / Nos (Actual)": 2,
                    "Contract Price / Frequency (RM)": contractValue.toFixed(2),
                    "Monthly Planned Work": 1,
                    "Monthly Planned Fee (RM)": 2550.0,
                    "Monthly Actual Work Done": 1,
                    "Monthly Actual Fee (RM)": contractValue.toFixed(2),
                    Rating: "0",
                    "Monthly Deductible Fee (RM)": "0",
                    "Monthly Payable Fee (RM)": "0",
                };
                if (ppmArray.length > 0) {
                    const ppmItem = ppmArray[0];
                    reportItem.Rating = ((_k = (_j = ppmItem.cases[0]) === null || _j === void 0 ? void 0 : _j.rating) === null || _k === void 0 ? void 0 : _k.name) || "N/A";
                    reportItem["Monthly Deductible Fee (RM)"] = deductPer.toFixed(2);
                    reportItem["Monthly Payable Fee (RM)"] = payablefee.toFixed(2);
                }
                if (report[eqTypeItem.name]) {
                    report[eqTypeItem.name].push({ ...reportItem });
                }
                else {
                    report[eqTypeItem.name] = [{ ...reportItem }];
                }
            });
        });
        const transformedReport = Object.entries(report).map(([key, value]) => ({
            eqtype: {
                name: key,
                reportitem: value,
            },
        }));
        console.log(transformedReport);
        return transformedReport;
    }
    async getdata2(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.WorkTradeService.findMany({
            where: {
                id: 6,
                company: {
                    id: data["id"],
                },
            },
            relations: [
                "company",
                "groupmain.eqtype.ppmchecklist.ppm.cases.rating.deduction",
                "groupmain.eqtype.ppmchecklist.serviceContract",
            ],
        });
        const reportItems = response.map((worktrade, index) => {
            var _a;
            const ppmchecklist = worktrade.groupmain[0].eqtype[0].ppmchecklist[0];
            if (ppmchecklist.ppm.length > 0 &&
                ppmchecklist.serviceContract.length > 0) {
                const intervalSeconds = Number(ppmchecklist.ppm[0].interval);
                const intervalDays = intervalSeconds / (24 * 60 * 60);
                const frequency5Years = Math.floor(365 / intervalDays) * 5;
                const contractValue = ppmchecklist.serviceContract[0].contract_value;
                const payment5Years = frequency5Years * contractValue;
                return {
                    "No.": String.fromCharCode(97 + index),
                    Indicators: ppmchecklist.name,
                    "Checklist Ref. No.": ppmchecklist.referenceNo,
                    "Frequency for 5 Years": frequency5Years,
                    "Payment Fee for 5 Years (RM)": payment5Years,
                    Quantity: 1,
                    "Unit (Unit / Lot / Nos)": "Lot",
                    "Quantity of Checklist by Department / Block / Nos (Planned)": 2,
                    "Quantity of Checklist by Department / Block / Nos (Actual)": 2,
                    "Contract Price / Frequency (RM)": contractValue.toFixed(2),
                    "Monthly Planned Work": 1,
                    "Monthly Planned Fee (RM)": 2550.0,
                    "Monthly Actual Work Done": 1,
                    "Monthly Actual Fee (RM)": contractValue.toFixed(2),
                    Rating: ((_a = ppmchecklist.ppm[0].cases[0].rating) === null || _a === void 0 ? void 0 : _a.name) || "N/A",
                    "Monthly Deductible Fee (RM)": 0,
                    "Monthly Payable Fee (RM)": 0,
                };
            }
        });
        return { reportItems: reportItems.filter((item) => item != null) };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workTrade_entity_1.WorkTrade]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, workTrade_entity_1.WorkTrade]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("user"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "getbyuserID", null);
__decorate([
    (0, common_1.Get)("company/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "byCompany", null);
__decorate([
    (0, common_1.Get)("byUserCompany"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "byUser", null);
__decorate([
    (0, common_1.Get)("/template/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "downloadexcel", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "downloadExcelData", null);
__decorate([
    (0, common_1.Post)("/excel"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storages })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)("costwk"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "getdata", null);
__decorate([
    (0, common_1.Get)("getdata2"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkTradeController.prototype, "getdata2", null);
WorkTradeController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("worktrade"),
    __metadata("design:paramtypes", [worktrade_service_1.WorkTradeService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], WorkTradeController);
exports.WorkTradeController = WorkTradeController;
//# sourceMappingURL=worktrade.controller.js.map