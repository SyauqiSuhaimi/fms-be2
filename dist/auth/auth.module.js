"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usertype_entity_1 = require("./usertype.entity");
const userpermission_entity_1 = require("./userpermission.entity");
const feature_entity_1 = require("./feature.entity");
const user_entity_1 = require("./user.entity");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const dist_1 = require("@nestjs/jwt/dist");
const worktrade_module_1 = require("../workTrade/worktrade.module");
const helper_module_1 = require("../helper/helper.module");
const roles_guard_1 = require("./roles.guard");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, usertype_entity_1.userType, userpermission_entity_1.userPermission, feature_entity_1.Feature]),
            dist_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            worktrade_module_1.WorkTradeModule,
            helper_module_1.HelperModule,
        ],
        controllers: [auth_controller_1.AuthController, auth_controller_1.AuthController2],
        providers: [auth_service_1.AuthService, roles_guard_1.RolesGuard],
        exports: [auth_service_1.AuthService, roles_guard_1.RolesGuard],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map