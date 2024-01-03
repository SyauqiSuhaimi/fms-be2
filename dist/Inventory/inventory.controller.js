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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("./inventory.service");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const general_service_1 = require("../helper/general.service");
const inventory_entity_1 = require("../entities/inventory.entity");
const helper_1 = require("../helper/helper");
const inventory_price_history_service_1 = require("../inventory_price_history/inventory_price_history.service");
const destinationPath = "/opt/bitnami/apache/htdocs/files/inventory";
const storages = helper_1.default.functions.createMulterStorage(destinationPath);
let InventoryController = class InventoryController {
    constructor(InventoryService, Inventory_Price_historyService, jwtService, GeneralService) {
        this.InventoryService = InventoryService;
        this.Inventory_Price_historyService = Inventory_Price_historyService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.InventoryService.findAll();
        return response;
    }
    async findInventory(request) {
        console.log("halo");
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.InventoryService.findInventory({
            where: { company: { user: { id: data["id"] } } },
        });
        return response;
    }
    async byCompany(request, id) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        if (data["usertype"] == "superadmin") {
            const response = await this.InventoryService.findInventory({
                where: { company: { id: id } },
            });
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async findOne(id) {
        const response = await this.InventoryService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createInventoryData) {
        console.log("createInventoryData", createInventoryData);
        const response = await this.InventoryService.create(createInventoryData);
        console.log("res", response);
        const { effectivePrice, ...responseWithoutCircularRef } = response;
        return responseWithoutCircularRef;
    }
    async update(id, updateInventoryData) {
        const response = await this.InventoryService.findOne({
            where: { id: updateInventoryData.id },
        });
        console.log("updateInventoryData", updateInventoryData);
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            if (updateInventoryData.cost != response.cost) {
                let history = {
                    id: 0,
                    resit_attachment: "",
                    inventory: response,
                    inventoryusage: null,
                    description: updateInventoryData.name,
                    cost: updateInventoryData.cost,
                };
                updateInventoryData.effectivePrice =
                    await this.Inventory_Price_historyService.create(history);
            }
            const response2 = await this.InventoryService.update(updateInventoryData.id, updateInventoryData);
            return response2;
        }
    }
    async delete(id) {
        const response = await this.InventoryService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.InventoryService.remove(id);
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
        this.InventoryService.parseExcelFile(files, company);
    }
    async downloadExcelData(res, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.InventoryService.findInventory({
            where: { company: { user: { id: data["id"] } } },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            let columns = [
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "ID",
                },
                {
                    field: "name",
                    format: (value) => `${value}`,
                    label: "Name",
                },
                {
                    field: "cost",
                    format: (value) => `${value}`,
                    label: "Cost Per Item (RM)",
                },
                {
                    field: "quantity",
                    format: (value) => `${value}`,
                    label: "Quantity",
                },
                {
                    field: "attachment",
                    format: (value) => `https://www.myces-fms.com/files/ppmChecklist/${value}`,
                    label: "Attachment",
                },
            ];
            const fileNamePrefix = "Inventory";
            const filePath = await this.GeneralService.downloadExcelData(response, fileNamePrefix, columns);
            res.download(filePath);
        }
    }
    async downloadexcel(res) {
        const data = [
            {
                name: "Item Name",
                cost: "10",
                quantity: "100",
            },
        ];
        const fileNamePrefix = "template";
        const filePath = await this.GeneralService.downloadExcelData(data, fileNamePrefix);
        res.download(filePath);
    }
    async sparepartsummaryla(bodyData, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response1 = await this.InventoryService.findInventory({
            where: {
                company: { id: data["id"] },
            },
            relations: [
                "company",
                "inventorypricehistory",
                "inventoryusage",
                "inventoryusage.casehistory",
                "inventoryusage.casehistory.cases",
                "inventoryusage.casehistory.cases.equipment",
                "inventoryusage.casehistory.cases.equipment.worktrade",
                "inventoryusage.casehistory.cases.equipment.department",
            ],
        });
        const report = response1.map((item) => {
            var _a, _b, _c, _d, _e;
            const inventoryUsage = item.inventoryusage[0];
            const caseHistory = (inventoryUsage === null || inventoryUsage === void 0 ? void 0 : inventoryUsage.casehistory) || {};
            const equipment = ((_a = caseHistory.cases) === null || _a === void 0 ? void 0 : _a.equipment) || {};
            return {
                site: ((_b = item.company) === null || _b === void 0 ? void 0 : _b.name) || "",
                department: ((_c = equipment.department) === null || _c === void 0 ? void 0 : _c.name) || "",
                workType: ((_d = equipment.worktrade) === null || _d === void 0 ? void 0 : _d.name) || "",
                workRequestNumber: ((_e = caseHistory.cases) === null || _e === void 0 ? void 0 : _e.id) || "",
                assetNumber: equipment.asset_number || "",
                assetName: equipment.name || "",
                problemDescription: caseHistory.description || "",
                serviceRequestStatus: caseHistory.status || "",
                partDescription: item.name || "",
                qty: item.inventoryusage.length > 0 ? inventoryUsage.count : 0,
            };
        });
        return report;
    }
    async sparepartsummaryla2(bodyData, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response1 = await this.InventoryService.findInventory({
            where: {
                company: { id: data["id"] },
            },
            relations: [
                "company",
                "inventorypricehistory",
                "inventoryusage",
                "inventoryusage.casehistory",
                "inventoryusage.casehistory.cases",
                "inventoryusage.casehistory.cases.equipment",
                "inventoryusage.casehistory.cases.equipment.worktrade",
                "inventoryusage.casehistory.cases.equipment.department",
            ],
        });
        const report = response1
            .map((item) => {
            var _a, _b, _c, _d, _e;
            const inventoryUsage = item.inventoryusage[0];
            const caseHistory = (inventoryUsage === null || inventoryUsage === void 0 ? void 0 : inventoryUsage.casehistory) || {};
            const equipment = ((_a = caseHistory.cases) === null || _a === void 0 ? void 0 : _a.equipment) || {};
            const site = ((_b = item.company) === null || _b === void 0 ? void 0 : _b.name) || "";
            const department = ((_c = equipment.department) === null || _c === void 0 ? void 0 : _c.name) || "";
            const workType = ((_d = equipment.worktrade) === null || _d === void 0 ? void 0 : _d.name) || "";
            const workRequestNumber = ((_e = caseHistory.cases) === null || _e === void 0 ? void 0 : _e.id) || "";
            const assetNumber = equipment.asset_number || "";
            const assetName = equipment.name || "";
            const problemDescription = caseHistory.description || "";
            const serviceRequestStatus = caseHistory.status || "";
            const partDescription = item.name || "";
            const qty = item.inventoryusage.length > 0 ? inventoryUsage.count : 0;
            const isCompleteData = site !== "" &&
                department !== "" &&
                workType !== "" &&
                workRequestNumber !== "" &&
                assetNumber !== "" &&
                assetName !== "" &&
                problemDescription !== "" &&
                serviceRequestStatus !== "" &&
                partDescription !== "";
            if (isCompleteData) {
                return {
                    site,
                    department,
                    workType,
                    workRequestNumber,
                    assetNumber,
                    assetName,
                    problemDescription,
                    serviceRequestStatus,
                    partDescription,
                    qty,
                };
            }
        })
            .filter(Boolean);
        return report;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("bycompany"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findInventory", null);
__decorate([
    (0, common_1.Get)("bycompany/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "byCompany", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_entity_1.Inventory]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, inventory_entity_1.Inventory]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("/excel"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storages })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "downloadExcelData", null);
__decorate([
    (0, common_1.Get)("/template/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "downloadexcel", null);
__decorate([
    (0, common_1.Get)("sparepartsummaryla"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "sparepartsummaryla", null);
__decorate([
    (0, common_1.Get)("sparepartsummaryla2"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "sparepartsummaryla2", null);
InventoryController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("inventory"),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService,
        inventory_price_history_service_1.Inventory_Price_historyService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], InventoryController);
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventory.controller.js.map