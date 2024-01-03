"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipment_statusModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const equipment_status_entity_1 = require("../entities/equipment_status.entity");
const equipment_status_controller_1 = require("./equipment_status.controller");
const equipment_status_service_1 = require("./equipment_status.service");
let equipment_statusModule = class equipment_statusModule {
};
equipment_statusModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([equipment_status_entity_1.Equipment_Status]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        controllers: [equipment_status_controller_1.equipment_statusController],
        providers: [equipment_status_service_1.equipment_statusService],
        exports: [equipment_status_service_1.equipment_statusService],
    })
], equipment_statusModule);
exports.equipment_statusModule = equipment_statusModule;
//# sourceMappingURL=equipment_status.module.js.map