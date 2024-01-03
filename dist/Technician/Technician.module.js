"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianModel = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const technician_entity_1 = require("../entities/technician.entity");
const Technician_controller_1 = require("./Technician.controller");
const Technician_service_1 = require("./Technician.service");
const user_entity_1 = require("../auth/user.entity");
const jwt_1 = require("@nestjs/jwt");
const notification_module_1 = require("../notification/notification.module");
const gateway_module_1 = require("../GatewayHandler/gateway.module");
let TechnicianModel = class TechnicianModel {
};
TechnicianModel = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([technician_entity_1.Technician, user_entity_1.User]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            notification_module_1.NotificationsModule,
            gateway_module_1.GatewayModule,
        ],
        controllers: [Technician_controller_1.TechnicianController],
        providers: [Technician_service_1.TechnicianService],
    })
], TechnicianModel);
exports.TechnicianModel = TechnicianModel;
//# sourceMappingURL=Technician.module.js.map