"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory_UsageModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const helper_module_1 = require("../helper/helper.module");
const inventory_usage_service_1 = require("./inventory_usage.service");
const inventory_usage_entity_1 = require("../entities/inventory_usage.entity");
const inventory_usage_controller_1 = require("./inventory_usage.controller");
let Inventory_UsageModule = class Inventory_UsageModule {
};
Inventory_UsageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([inventory_usage_entity_1.Inventory_Usage]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            helper_module_1.HelperModule,
        ],
        controllers: [inventory_usage_controller_1.Inventory_UsageController],
        providers: [inventory_usage_service_1.Inventory_UsageService],
        exports: [inventory_usage_service_1.Inventory_UsageService],
    })
], Inventory_UsageModule);
exports.Inventory_UsageModule = Inventory_UsageModule;
//# sourceMappingURL=inventory_usage.module.js.map