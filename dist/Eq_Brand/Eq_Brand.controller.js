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
exports.Eq_BrandController = void 0;
const common_1 = require("@nestjs/common");
const Eq_Brand_service_1 = require("./Eq_Brand.service");
const eq_brand_entity_1 = require("../entities/eq_brand.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const Eq_Model_service_1 = require("../Eq_Model/Eq_Model.service");
const general_service_1 = require("../helper/general.service");
let Eq_BrandController = class Eq_BrandController {
    constructor(Eq_BrandService, Eq_Model, GeneralService) {
        this.Eq_BrandService = Eq_BrandService;
        this.Eq_Model = Eq_Model;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.Eq_BrandService.findAll();
        return response;
    }
    async findEq_Brand(id) {
        const response = await this.Eq_BrandService.findEq_Brand({
            where: { company: { id: id } },
        });
        return response;
    }
    async findOne(id) {
        const response = await this.Eq_BrandService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createEq_BrandData) {
        const response = await this.Eq_BrandService.create(createEq_BrandData);
        return response;
    }
    async update(id, updateEq_BrandData) {
        const response = await this.Eq_BrandService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.Eq_BrandService.update(id, updateEq_BrandData);
            return updateEq_BrandData;
        }
    }
    async delete(id) {
        const response = await this.Eq_BrandService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.Eq_BrandService.remove(id);
            return response;
        }
    }
    async brandModel(id) {
        const eq_brand = await this.Eq_BrandService.findEq_Brand({
            where: { company: { id: id } },
        });
        const eq_model = await this.Eq_Model.findEq_Model({
            where: { company: { id: id } },
        });
        return {
            eq_brand: eq_brand,
            eq_model: eq_model,
        };
    }
    async testdownloadExcelData(res) {
        const data = await this.Eq_BrandService.findEq_Brand({
            relations: ["eq_model", "company"],
        });
        const fileNamePrefix = "Eq_brand&Eq_model";
        const filePath = await this.GeneralService.downloadExcelData(this.GeneralService.flattenArrayOfObjects(fileNamePrefix, data), fileNamePrefix, {}, true);
        res.download(filePath);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Eq_BrandController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("company/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Eq_BrandController.prototype, "findEq_Brand", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Eq_BrandController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [eq_brand_entity_1.Eq_Brand]),
    __metadata("design:returntype", Promise)
], Eq_BrandController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, eq_brand_entity_1.Eq_Brand]),
    __metadata("design:returntype", Promise)
], Eq_BrandController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Eq_BrandController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("brandmodel/:companyid"),
    __param(0, (0, common_1.Param)("companyid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Eq_BrandController.prototype, "brandModel", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Eq_BrandController.prototype, "testdownloadExcelData", null);
Eq_BrandController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("eq_brand"),
    __metadata("design:paramtypes", [Eq_Brand_service_1.Eq_BrandService,
        Eq_Model_service_1.Eq_ModelService,
        general_service_1.GeneralService])
], Eq_BrandController);
exports.Eq_BrandController = Eq_BrandController;
//# sourceMappingURL=Eq_Brand.controller.js.map