"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asset_groupModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const asset_group_entity_1 = require("../entities/asset_group.entity");
const asset_group_controller_1 = require("./asset_group.controller");
const asset_group_service_1 = require("./asset_group.service");
const helper_module_1 = require("../helper/helper.module");
let asset_groupModule = class asset_groupModule {
};
asset_groupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([asset_group_entity_1.asset_group]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            helper_module_1.HelperModule,
        ],
        controllers: [asset_group_controller_1.asset_groupController],
        providers: [asset_group_service_1.asset_groupService],
        exports: [asset_group_service_1.asset_groupService],
    })
], asset_groupModule);
exports.asset_groupModule = asset_groupModule;
//# sourceMappingURL=asset_group.module.js.map