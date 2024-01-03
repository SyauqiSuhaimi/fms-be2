"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupCompanyModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const groupCompany_entity_1 = require("../entities/groupCompany.entity");
const group_company_controller_1 = require("./group_company.controller");
const group_company_service_1 = require("./group_company.service");
let GroupCompanyModule = class GroupCompanyModule {
};
GroupCompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([groupCompany_entity_1.GroupCompany]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        controllers: [group_company_controller_1.GroupCompanyController],
        providers: [group_company_service_1.GroupCompanyService],
    })
], GroupCompanyModule);
exports.GroupCompanyModule = GroupCompanyModule;
//# sourceMappingURL=group_company.module.js.map