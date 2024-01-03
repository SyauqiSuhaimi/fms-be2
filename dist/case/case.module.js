"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const feature_entity_1 = require("../auth/feature.entity");
const user_entity_1 = require("../auth/user.entity");
const userpermission_entity_1 = require("../auth/userpermission.entity");
const usertype_entity_1 = require("../auth/usertype.entity");
const case_status_service_1 = require("../Case_Status/case_status.service");
const case_entity_1 = require("../entities/case.entity");
const case_status_entity_1 = require("../entities/case_status.entity");
const equipment_entity_1 = require("../entities/equipment.entity");
const case_controller_1 = require("./case.controller");
const case_service_1 = require("./case.service");
const Case_History_module_1 = require("../Case_History/Case_History.module");
const auth_module_1 = require("../auth/auth.module");
const group_list_module_1 = require("../Group_list/group_list.module");
const Area_module_1 = require("../Area/Area.module");
const notification_module_1 = require("../notification/notification.module");
const gateway_module_1 = require("../GatewayHandler/gateway.module");
const department_module_1 = require("../department/department.module");
const Sub_Area_module_1 = require("../Sub_Area/Sub_Area.module");
const helper_module_1 = require("../helper/helper.module");
const Case_Type_module_1 = require("../Case_Type/Case_Type.module");
const equipment_history_module_1 = require("../equipment_history/equipment_history.module");
const asset_status_module_1 = require("../asset_status/asset_status.module");
const qc_module_1 = require("../qc/qc.module");
const inventory_usage_module_1 = require("../inventory_usage/inventory_usage.module");
const equipment_module_1 = require("../equipment/equipment.module");
let CaseModule = class CaseModule {
};
CaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            helper_module_1.HelperModule,
            typeorm_1.TypeOrmModule.forFeature([
                case_entity_1.Case,
                equipment_entity_1.Equipment,
                user_entity_1.User,
                case_status_entity_1.Case_Status,
                usertype_entity_1.userType,
                userpermission_entity_1.userPermission,
                feature_entity_1.Feature,
            ]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            (0, common_1.forwardRef)(() => Case_History_module_1.CaseHistoryModule),
            auth_module_1.AuthModule,
            group_list_module_1.GroupListModule,
            Area_module_1.AreaModule,
            notification_module_1.NotificationsModule,
            gateway_module_1.GatewayModule,
            department_module_1.DepartmentModule,
            Sub_Area_module_1.SubAreaModule,
            Case_Type_module_1.CaseTypeModule,
            equipment_history_module_1.Equipment_HistoryModel,
            asset_status_module_1.asset_statusModule,
            qc_module_1.qcModule,
            inventory_usage_module_1.Inventory_UsageModule,
            (0, common_1.forwardRef)(() => equipment_module_1.EquipmentModel),
        ],
        controllers: [case_controller_1.CaseController],
        providers: [case_service_1.CaseService, case_status_service_1.Case_StatusService],
        exports: [case_service_1.CaseService],
    })
], CaseModule);
exports.CaseModule = CaseModule;
//# sourceMappingURL=case.module.js.map