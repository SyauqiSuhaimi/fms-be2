"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Case_History_service_1 = require("./Case_History.service");
const caseHistory_entity_1 = require("../entities/caseHistory.entity");
const Case_History_controller_1 = require("./Case_History.controller");
const jwt_1 = require("@nestjs/jwt");
const gateway_module_1 = require("../GatewayHandler/gateway.module");
const notification_module_1 = require("../notification/notification.module");
const auth_module_1 = require("../auth/auth.module");
const equipment_module_1 = require("../equipment/equipment.module");
const case_status_module_1 = require("../Case_Status/case_status.module");
const helper_module_1 = require("../helper/helper.module");
const inventory_usage_module_1 = require("../inventory_usage/inventory_usage.module");
const equipment_history_module_1 = require("../equipment_history/equipment_history.module");
const equipment_status_module_1 = require("../eq_status/equipment_status.module");
const case_module_1 = require("../case/case.module");
let CaseHistoryModule = class CaseHistoryModule {
};
CaseHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            helper_module_1.HelperModule,
            typeorm_1.TypeOrmModule.forFeature([caseHistory_entity_1.CaseHistory]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            auth_module_1.AuthModule,
            notification_module_1.NotificationsModule,
            gateway_module_1.GatewayModule,
            case_status_module_1.Case_StatusModule,
            inventory_usage_module_1.Inventory_UsageModule,
            equipment_history_module_1.Equipment_HistoryModel,
            equipment_status_module_1.equipment_statusModule,
            (0, common_1.forwardRef)(() => case_module_1.CaseModule),
            (0, common_1.forwardRef)(() => equipment_module_1.EquipmentModel),
        ],
        controllers: [Case_History_controller_1.CaseHistoryController],
        providers: [Case_History_service_1.CaseHistoryService],
        exports: [Case_History_service_1.CaseHistoryService],
    })
], CaseHistoryModule);
exports.CaseHistoryModule = CaseHistoryModule;
//# sourceMappingURL=Case_History.module.js.map