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
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const contract_service_1 = require("./contract.service");
const serviceContract_entity_1 = require("../entities/serviceContract.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
let ContractController = class ContractController {
    constructor(contractService, jwtService) {
        this.contractService = contractService;
        this.jwtService = jwtService;
    }
    async fillAll() {
        const response = await this.contractService.findAll();
        return response;
    }
    async findByCompany(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.contractService.findMany({
            where: { company: { user: { id: data["id"] } } },
            relations: ["equipment"],
        });
        return response;
    }
    async findOne(id) {
        const response = await this.contractService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createContractData) {
        const response = await this.contractService.create(createContractData);
        return response;
    }
    async update(id, createContractData) {
        const response = await this.contractService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.contractService.update(id, createContractData);
            return createContractData;
        }
    }
    async delete(id) {
        const response = await this.contractService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.contractService.remove(id);
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
        response = await this.contractService.findMany({
            where: rules,
        });
        console.log("rules");
        if (response === null || !response.length) {
            console.log("masuk");
            response = await this.contractService.findMany({
                where: {
                    company: { user: { id: data["id"] } },
                    contract_end: (0, typeorm_1.MoreThanOrEqual)(currentEpochTime),
                },
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
], ContractController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("company"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "findByCompany", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [serviceContract_entity_1.ServiceContract]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, serviceContract_entity_1.ServiceContract]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("getAll"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getAll", null);
ContractController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("service-contract"),
    __metadata("design:paramtypes", [contract_service_1.ContractService,
        jwt_1.JwtService])
], ContractController);
exports.ContractController = ContractController;
//# sourceMappingURL=contract.controller.js.map