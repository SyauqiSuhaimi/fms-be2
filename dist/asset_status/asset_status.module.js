"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asset_statusModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const asset_status_entity_1 = require("../entities/asset_status.entity");
const asset_status_controller_1 = require("./asset_status.controller");
const asset_status_service_1 = require("./asset_status.service");
let asset_statusModule = class asset_statusModule {
};
asset_statusModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([asset_status_entity_1.Asset_Status]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        controllers: [asset_status_controller_1.asset_statusController],
        providers: [asset_status_service_1.asset_statusService],
        exports: [asset_status_service_1.asset_statusService],
    })
], asset_statusModule);
exports.asset_statusModule = asset_statusModule;
//# sourceMappingURL=asset_status.module.js.map