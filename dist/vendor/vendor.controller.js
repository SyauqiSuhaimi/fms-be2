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
exports.VendorController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const vendor_service_1 = require("./vendor.service");
const vendor_entity_1 = require("../entities/vendor.entity");
const typeorm_1 = require("typeorm");
let VendorController = class VendorController {
    constructor(VendorService, jwtService) {
        this.VendorService = VendorService;
        this.jwtService = jwtService;
    }
    async fillAll() {
        const response = await this.VendorService.findAll({});
        return response;
    }
    async byCompany(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        console.log("data", data);
        const response = await this.VendorService.findAll({
            where: { company: { user: { id: data["id"] } } },
            relations: ["servicecontract"],
        });
        return response;
    }
    async findOne(id) {
        const response = await this.VendorService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createVendorData) {
        const response = await this.VendorService.create(createVendorData);
        return response;
    }
    async update(id, updateVendorData) {
        const response = await this.VendorService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.VendorService.update(id, updateVendorData);
            return updateVendorData;
        }
    }
    async delete(id) {
        const response = await this.VendorService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.VendorService.remove(id);
            return response;
        }
    }
    async getAll(request, bodyData) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let response = null;
        let rules = {};
        if (bodyData["equipment"]) {
            rules["equipment"] = { id: bodyData["equipment"]["id"] };
        }
        const currentEpochTime = Math.floor(new Date().getTime() / 1000);
        rules["contract_end"] = (0, typeorm_1.MoreThanOrEqual)(currentEpochTime);
        rules["company"] = { user: { id: data["id"] } };
        response = await this.VendorService.findAll({
            where: {
                company: { user: { id: data["id"] } },
                servicecontract: rules,
            },
            relations: ["servicecontract"],
        });
        console.log("rules");
        if (response === null || !response.length) {
            console.log("masuk");
            response = await this.VendorService.findAll({
                where: {
                    company: { user: { id: data["id"] } },
                    servicecontract: { contract_end: (0, typeorm_1.MoreThanOrEqual)(currentEpochTime) },
                },
                relations: ["servicecontract"],
            });
        }
        return response;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("bycompany"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "byCompany", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_entity_1.Vendor]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, vendor_entity_1.Vendor]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("getAll"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getAll", null);
VendorController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("vendor"),
    __metadata("design:paramtypes", [vendor_service_1.VendorService,
        jwt_1.JwtService])
], VendorController);
exports.VendorController = VendorController;
//# sourceMappingURL=vendor.controller.js.map