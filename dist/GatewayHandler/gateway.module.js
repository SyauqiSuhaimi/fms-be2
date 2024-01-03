"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const feature_entity_1 = require("../auth/feature.entity");
const user_entity_1 = require("../auth/user.entity");
const userpermission_entity_1 = require("../auth/userpermission.entity");
const usertype_entity_1 = require("../auth/usertype.entity");
const serviceContract_entity_1 = require("../entities/serviceContract.entity");
const contract_service_1 = require("../service-contract/contract.service");
const cases_gateway_1 = require("./cases.gateway");
const auth_module_1 = require("../auth/auth.module");
let GatewayModule = class GatewayModule {
};
GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                serviceContract_entity_1.ServiceContract,
                user_entity_1.User,
                usertype_entity_1.userType,
                userpermission_entity_1.userPermission,
                feature_entity_1.Feature,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [],
        providers: [cases_gateway_1.CasesGateway, contract_service_1.ContractService],
        exports: [cases_gateway_1.CasesGateway, contract_service_1.ContractService],
    })
], GatewayModule);
exports.GatewayModule = GatewayModule;
//# sourceMappingURL=gateway.module.js.map