"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const maintenance_entity_1 = require("../entities/maintenance.entity");
const Maintenance_controller_1 = require("./Maintenance.controller");
const Maintenance_service_1 = require("./Maintenance.service");
let MaintenanceModule = class MaintenanceModule {
};
MaintenanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([maintenance_entity_1.Maintenance]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        controllers: [Maintenance_controller_1.MaintenanceController],
        providers: [Maintenance_service_1.MaintenanceService],
    })
], MaintenanceModule);
exports.MaintenanceModule = MaintenanceModule;
//# sourceMappingURL=Maintenance.module.js.map