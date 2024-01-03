"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vo_statusModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const vo_status_entity_1 = require("../entities/vo_status.entity");
const vo_status_controller_1 = require("./vo_status.controller");
const vo_status_service_1 = require("./vo_status.service");
let vo_statusModule = class vo_statusModule {
};
vo_statusModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([vo_status_entity_1.vo_status]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        controllers: [vo_status_controller_1.vo_statusController],
        providers: [vo_status_service_1.vo_statusService],
        exports: [vo_status_service_1.vo_statusService],
    })
], vo_statusModule);
exports.vo_statusModule = vo_statusModule;
//# sourceMappingURL=vo_status.module.js.map