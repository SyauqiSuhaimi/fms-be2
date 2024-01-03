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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const company_service_1 = require("./company.service");
const company_entity_1 = require("../entities/company.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const asset_status_service_1 = require("../asset_status/asset_status.service");
const platform_express_1 = require("@nestjs/platform-express");
const helper_1 = require("../helper/helper");
const destinationPath = "/opt/bitnami/apache/htdocs/files/forms";
const storage = helper_1.default.functions.createMulterStorage(destinationPath);
let CompanyController = class CompanyController {
    constructor(CompanyService, jwtService, authService, asset_statusService) {
        this.CompanyService = CompanyService;
        this.jwtService = jwtService;
        this.authService = authService;
        this.asset_statusService = asset_statusService;
    }
    async geteqData(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.CompanyService.findOne({
            where: { user: { id: data["id"] } },
            relations: [
                "eq_brand.eq_model",
                "eq_type",
                "eq_classification",
                "grouplist.worktradelist",
                "department.area.subarea",
                "category",
                "servicecontract",
                "mda",
            ],
        });
        const asset_status = await this.asset_statusService.findAll();
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return {
                eq_brand: response.eq_brand,
                eq_type: response.eq_type,
                eq_class: response.eq_classification,
                groupList: response.grouplist,
                deptList: response.department,
                asset_statusList: asset_status,
                servicecontractList: response.servicecontract,
                mdaList: response.mda,
                category: response.category,
            };
        }
    }
    async fillAll() {
        const response = await this.CompanyService.findCompany({
            relations: ["department", "usertype", "usertype", "usertype.permissions"],
        });
        return response;
    }
    async fillAlldata(id) {
        const response = await this.CompanyService.findCompany({
            where: { id: id },
            relations: [
                "department",
                "group",
                "servicecontract",
                "area",
                "grouplist",
                "worktrade",
                "usertype",
                "usertype.permissions",
                "usertype.permissions.features",
            ],
        });
        console.log(response, "data company");
        return response;
    }
    async findOne(id) {
        const response = await this.CompanyService.findOne({
            where: { id: id },
            relations: ["department", "equipment"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async findbyUser(request) {
        console.log("test");
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        console.log(data["id"]);
        const response = await this.CompanyService.findOne({
            where: { user: { id: data["id"] } },
            relations: ["department", "equipment"],
        });
        response["departmentList"] = response.department.length;
        response["equipmentList"] = response.equipment.length;
        delete response.department;
        delete response.equipment;
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createCompanyData) {
        const response = await this.CompanyService.create(createCompanyData);
        return response;
    }
    async update(id, createCompanyData) {
        console.log("test");
        console.log(createCompanyData);
        const response = await this.CompanyService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.CompanyService.update(id, createCompanyData);
            return createCompanyData;
        }
    }
    async delete(id) {
        const response = await this.CompanyService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.CompanyService.remove(id);
            return response;
        }
    }
    async createCompany(createCompanyData) {
        const response = await this.CompanyService.create(createCompanyData);
        const companyId = response.id;
        const adminUsertype = createCompanyData.usertype.find((userType) => userType.name === "admin");
        const features = await this.authService.findAllFeature({});
        if (adminUsertype && features.length > 0) {
            features.forEach(async (feature) => {
                const adminfeature = await this.authService.createuserPer({
                    id: null,
                    level: 2,
                    usertypes: adminUsertype.id,
                    features: feature.id,
                });
                console.log(adminfeature, "userPerData");
            });
        }
        return response;
    }
    async uploadworkorder(body, files) {
        const response = await this.CompanyService.findOne({
            where: { id: body.id },
        });
        if (!response) {
            return { success: false, msg: "Error, please contact admin" };
        }
        const updateField = body.type === 1 ? "workorder" : "ppmform";
        await Promise.all(files.map(async (file) => {
            const fieldName = `${updateField}name`;
            const fieldType = `${updateField}type`;
            response[fieldName] = file.filename;
            response[fieldType] = 3;
            await this.CompanyService.update(body.id, response);
        }));
        return { success: true, msg: "File Uploaded" };
    }
};
__decorate([
    (0, common_1.Get)("geteqdata"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "geteqData", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("alldata/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "fillAlldata", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("user"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findbyUser", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_entity_1.Company]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, company_entity_1.Company]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("create/company"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_entity_1.Company]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Post)("uploadworkorder"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 20, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "uploadworkorder", null);
CompanyController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("company"),
    __metadata("design:paramtypes", [company_service_1.CompanyService,
        jwt_1.JwtService,
        auth_service_1.AuthService,
        asset_status_service_1.asset_statusService])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map