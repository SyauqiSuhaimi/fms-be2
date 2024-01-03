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
exports.Inventory_UsageController = void 0;
const common_1 = require("@nestjs/common");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const general_service_1 = require("../helper/general.service");
;
const inventory_usage_service_1 = require("./inventory_usage.service");
const typeorm_1 = require("typeorm");
const inventory_usage_entity_1 = require("../entities/inventory_usage.entity");
let Inventory_UsageController = class Inventory_UsageController {
    constructor(Inventory_UsageService, jwtService, GeneralService) {
        this.Inventory_UsageService = Inventory_UsageService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.Inventory_UsageService.findAll();
        return response;
    }
    async findInventory(request) {
        console.log("halo");
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.Inventory_UsageService.findInventoryusage({
            where: { company: { user: { id: data["id"] } } },
        });
        return response;
    }
    async byCompany(request, id) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        if (data["usertype"] == "superadmin") {
            const response = await this.Inventory_UsageService.findInventoryusage({
                where: { company: { id: id } },
            });
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async findOne(id) {
        const response = await this.Inventory_UsageService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createInventoryData) {
        const response = await this.Inventory_UsageService.create(createInventoryData);
        return response;
    }
    async delete(id) {
        const response = await this.Inventory_UsageService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.Inventory_UsageService.remove(id);
            return response;
        }
    }
    async getsparedata() {
        const data = await this.Inventory_UsageService.findInventoryusage({
            relations: [
                "inventory.company",
                "cases",
                "casehistory",
                "cases.equipment",
                "cases.equipment.worktrade",
                "cases.equipment.department",
                "inventorypricehistory",
            ],
        });
        return data;
    }
    async getspare1(startdate, enddate) {
        const data = await this.Inventory_UsageService.findInventoryusage({
            relations: [
                'cases',
                'cases.equipment',
                'cases.equipment.worktrade',
                'cases.equipment.department',
                'inventory',
                'inventory.company',
                'casehistory',
                'inventorypricehistory',
            ],
            where: {
                casehistory: {
                    datetime: (0, typeorm_1.Between)(startdate, enddate),
                }
            },
        });
        const report = data.map((item) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const inventoryUsage = item;
            const caseHistory = item.casehistory || {};
            const equipment = ((_a = item.cases) === null || _a === void 0 ? void 0 : _a.equipment) || {};
            return {
                site: ((_c = (_b = item.inventory) === null || _b === void 0 ? void 0 : _b.company) === null || _c === void 0 ? void 0 : _c.name) || "",
                department: ((_d = equipment.department) === null || _d === void 0 ? void 0 : _d.name) || "",
                workType: ((_e = equipment.worktrade) === null || _e === void 0 ? void 0 : _e.name) || "",
                workRequestNumber: ((_f = item.cases) === null || _f === void 0 ? void 0 : _f.id) || "",
                assetNumber: equipment.asset_number || "",
                assetName: equipment.name || "",
                problemDescription: caseHistory.description || "",
                serviceRequestStatus: caseHistory.status || "",
                partDescription: ((_g = item.inventory) === null || _g === void 0 ? void 0 : _g.name) || "",
                qty: item.count || 0,
            };
        });
        return report;
    }
    async getspare2() {
        const data = await this.Inventory_UsageService.findInventoryusage({
            relations: [
                "cases",
                "cases.equipment",
                "cases.equipment.worktrade",
                "cases.equipment.department",
                "inventory",
                "inventory.company",
                "casehistory",
                "inventorypricehistory",
            ],
        });
        const report = data.map((item) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const inventoryUsage = item;
            const caseHistory = item.casehistory || {};
            const equipment = ((_a = item.cases) === null || _a === void 0 ? void 0 : _a.equipment) || {};
            const datetime = caseHistory.datetime ? new Date(caseHistory.datetime * 1000) : null;
            const formattedDatetime = datetime ? datetime.toISOString() : null;
            return {
                site: ((_c = (_b = item.inventory) === null || _b === void 0 ? void 0 : _b.company) === null || _c === void 0 ? void 0 : _c.name) || "",
                department: ((_d = equipment.department) === null || _d === void 0 ? void 0 : _d.name) || "",
                workType: ((_e = equipment.worktrade) === null || _e === void 0 ? void 0 : _e.name) || "",
                workRequestNumber: ((_f = item.cases) === null || _f === void 0 ? void 0 : _f.id) || "",
                assetNumber: equipment.asset_number || "",
                assetName: equipment.name || "",
                problemDescription: caseHistory.description || "",
                serviceRequestStatus: caseHistory.status || "",
                partDescription: ((_g = item.inventory) === null || _g === void 0 ? void 0 : _g.name) || "",
                qty: item.count || 0,
                datetime: formattedDatetime,
            };
        });
        return report;
    }
    async getspareall(startdate, enddate) {
        const data = await this.Inventory_UsageService.findInventoryusage({
            relations: [
                'cases',
                'cases.equipment',
                'cases.equipment.worktrade',
                'cases.equipment.department',
                'inventory',
                'inventory.company',
                'casehistory',
                'inventorypricehistory',
            ],
            where: {
                casehistory: {
                    datetime: (0, typeorm_1.Between)(startdate, enddate),
                },
            },
        });
        const report = [];
        const monthMap = {
            "01": "January",
            "02": "February",
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            "10": "October",
            "11": "November",
            "12": "December",
        };
        data.forEach((item) => {
            var _a, _b, _c, _d;
            const inventoryUsage = item;
            const caseHistory = item.casehistory || {};
            const equipment = ((_a = item.cases) === null || _a === void 0 ? void 0 : _a.equipment) || {};
            const month = new Date(caseHistory.datetime * 1000).getMonth() + 1;
            const monthName = monthMap[String(month).padStart(2, "0")];
            const reportItem = {
                site: ((_c = (_b = item.inventory) === null || _b === void 0 ? void 0 : _b.company) === null || _c === void 0 ? void 0 : _c.name) || "",
                month: monthName,
                partDescription: ((_d = item.inventory) === null || _d === void 0 ? void 0 : _d.name) || "",
                qty: item.count || 0,
            };
            report.push(reportItem);
        });
        const overallReport = report.reduce((result, item) => {
            const key = `${item.site}-${item.month}-${item.partDescription}`;
            if (result[key]) {
                result[key].qty += item.qty;
            }
            else {
                result[key] = { ...item };
            }
            return result;
        }, {});
        const overallReportData = Object.values(overallReport);
        return overallReportData;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Inventory_UsageController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("bycompany"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Inventory_UsageController.prototype, "findInventory", null);
__decorate([
    (0, common_1.Get)("bycompany/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], Inventory_UsageController.prototype, "byCompany", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Inventory_UsageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_usage_entity_1.Inventory_Usage]),
    __metadata("design:returntype", Promise)
], Inventory_UsageController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Inventory_UsageController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('getsparedata'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Inventory_UsageController.prototype, "getsparedata", null);
__decorate([
    (0, common_1.Get)('getspare1'),
    __param(0, (0, common_1.Query)("startdate")),
    __param(1, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], Inventory_UsageController.prototype, "getspare1", null);
__decorate([
    (0, common_1.Get)('getspare2'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Inventory_UsageController.prototype, "getspare2", null);
__decorate([
    (0, common_1.Get)('getspareall'),
    __param(0, (0, common_1.Query)("startdate")),
    __param(1, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], Inventory_UsageController.prototype, "getspareall", null);
Inventory_UsageController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("inventory_usage"),
    __metadata("design:paramtypes", [inventory_usage_service_1.Inventory_UsageService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], Inventory_UsageController);
exports.Inventory_UsageController = Inventory_UsageController;
//# sourceMappingURL=inventory_usage.controller.js.map