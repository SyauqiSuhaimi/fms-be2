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
exports.Inventory_Price_HistoryController = void 0;
const common_1 = require("@nestjs/common");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const general_service_1 = require("../helper/general.service");
;
const helper_1 = require("../helper/helper");
const inventory_price_history_service_1 = require("./inventory_price_history.service");
const inventory_price_history_entity_1 = require("../entities/inventory_price_history.entity");
const destinationPath = "/opt/bitnami/apache/htdocs/files/inventory";
const storage = helper_1.default.functions.createMulterStorage(destinationPath);
let Inventory_Price_HistoryController = class Inventory_Price_HistoryController {
    constructor(Inventory_price_historyService, jwtService, GeneralService) {
        this.Inventory_price_historyService = Inventory_price_historyService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.Inventory_price_historyService.findAll();
        return response;
    }
    async findInventory(request) {
        console.log("halo");
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.Inventory_price_historyService.findInventory({
            where: { company: { user: { id: data["id"] } } },
        });
        return response;
    }
    async byCompany(request, id) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        if (data["usertype"] == "superadmin") {
            const response = await this.Inventory_price_historyService.findInventory({
                where: { company: { id: id } },
            });
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async findOne(id) {
        const response = await this.Inventory_price_historyService.findOne({
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
        const response = await this.Inventory_price_historyService.create(createInventoryData);
        return response;
    }
    createcase(body, files) {
        console.log("inventoryhistory/create", body);
        let n = files.length;
        let arr = [];
        body.image_file = "";
        if (n >= 1) {
            for (let i = 0; i < n; i++) {
                arr.push(files[i].filename);
            }
            body.image_file = arr.toString();
        }
        console.log("inventoryhistory/create");
        return this.Inventory_price_historyService.create(body);
    }
    async update(id, updateInventoryData) {
        const response = await this.Inventory_price_historyService.findOne({
            where: { id: updateInventoryData.id },
        });
        console.log("updateInventoryData", updateInventoryData);
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.Inventory_price_historyService.update(updateInventoryData.id, updateInventoryData);
            return updateInventoryData;
        }
    }
    async delete(id) {
        const response = await this.Inventory_price_historyService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.Inventory_price_historyService.remove(id);
            return response;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Inventory_Price_HistoryController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("bycompany"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Inventory_Price_HistoryController.prototype, "findInventory", null);
__decorate([
    (0, common_1.Get)("bycompany/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], Inventory_Price_HistoryController.prototype, "byCompany", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Inventory_Price_HistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_price_history_entity_1.Inventory_Price_History]),
    __metadata("design:returntype", Promise)
], Inventory_Price_HistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("inventoryhistory/create"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], Inventory_Price_HistoryController.prototype, "createcase", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, inventory_price_history_entity_1.Inventory_Price_History]),
    __metadata("design:returntype", Promise)
], Inventory_Price_HistoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Inventory_Price_HistoryController.prototype, "delete", null);
Inventory_Price_HistoryController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("inventory_price_history"),
    __metadata("design:paramtypes", [inventory_price_history_service_1.Inventory_Price_historyService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], Inventory_Price_HistoryController);
exports.Inventory_Price_HistoryController = Inventory_Price_HistoryController;
//# sourceMappingURL=inventory_price_history.controller.js.map