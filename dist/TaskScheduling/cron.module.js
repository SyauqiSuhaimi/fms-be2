"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronModule = void 0;
const common_1 = require("@nestjs/common");
const task_module_1 = require("./task.module");
const typeorm_1 = require("@nestjs/typeorm");
const case_entity_1 = require("../entities/case.entity");
const user_entity_1 = require("../auth/user.entity");
const usertype_entity_1 = require("../auth/usertype.entity");
const userpermission_entity_1 = require("../auth/userpermission.entity");
const feature_entity_1 = require("../auth/feature.entity");
const department_entity_1 = require("../entities/department.entity");
const equipment_entity_1 = require("../entities/equipment.entity");
const area_entity_1 = require("../entities/area.entity");
const caseHistory_entity_1 = require("../entities/caseHistory.entity");
const caseType_entity_1 = require("../entities/caseType.entity");
const case_status_entity_1 = require("../entities/case_status.entity");
const company_entity_1 = require("../entities/company.entity");
const eq_brand_entity_1 = require("../entities/eq_brand.entity");
const eq_classification_entity_1 = require("../entities/eq_classification.entity");
const eq_model_entity_1 = require("../entities/eq_model.entity");
const eq_type_entity_1 = require("../entities/eq_type.entity");
const equipment_history_entity_1 = require("../entities/equipment_history.entity");
const equipment_status_entity_1 = require("../entities/equipment_status.entity");
const groupCompany_entity_1 = require("../entities/groupCompany.entity");
const groupList_entity_1 = require("../entities/groupList.entity");
const holiday_entity_1 = require("../entities/holiday.entity");
const inventory_entity_1 = require("../entities/inventory.entity");
const maintenance_entity_1 = require("../entities/maintenance.entity");
const news_entity_1 = require("../entities/news.entity");
const notification_entity_1 = require("../entities/notification.entity");
const ppm_entity_1 = require("../entities/ppm.entity");
const ppmChecklist_entity_1 = require("../entities/ppmChecklist.entity");
const serviceContract_entity_1 = require("../entities/serviceContract.entity");
const subArea_entity_1 = require("../entities/subArea.entity");
const technician_entity_1 = require("../entities/technician.entity");
const tempppm_entity_1 = require("../entities/tempppm.entity");
const vendor_entity_1 = require("../entities/vendor.entity");
const workTrade_entity_1 = require("../entities/workTrade.entity");
const inventory_price_history_entity_1 = require("../entities/inventory_price_history.entity");
const inventory_usage_entity_1 = require("../entities/inventory_usage.entity");
let CronModule = class CronModule {
};
CronModule = __decorate([
    (0, common_1.Module)({
        imports: [
            task_module_1.taskModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [
                    user_entity_1.User,
                    usertype_entity_1.userType,
                    userpermission_entity_1.userPermission,
                    feature_entity_1.Feature,
                    department_entity_1.Department,
                    equipment_entity_1.Equipment,
                    case_entity_1.Case,
                    caseHistory_entity_1.CaseHistory,
                    company_entity_1.Company,
                    groupCompany_entity_1.GroupCompany,
                    maintenance_entity_1.Maintenance,
                    serviceContract_entity_1.ServiceContract,
                    area_entity_1.Area,
                    subArea_entity_1.SubArea,
                    caseType_entity_1.CaseType,
                    workTrade_entity_1.WorkTrade,
                    groupList_entity_1.GroupList,
                    technician_entity_1.Technician,
                    holiday_entity_1.Holiday,
                    case_status_entity_1.Case_Status,
                    vendor_entity_1.Vendor,
                    ppm_entity_1.PPM,
                    equipment_history_entity_1.Equipment_History,
                    equipment_status_entity_1.Equipment_Status,
                    news_entity_1.News,
                    eq_type_entity_1.Eq_Type,
                    eq_classification_entity_1.Eq_Classifications,
                    eq_brand_entity_1.Eq_Brand,
                    eq_model_entity_1.Eq_Model,
                    ppmChecklist_entity_1.ppmChecklist,
                    tempppm_entity_1.tempPpm,
                    inventory_entity_1.Inventory,
                    notification_entity_1.Notifications,
                    inventory_price_history_entity_1.Inventory_Price_History,
                    inventory_usage_entity_1.Inventory_Usage,
                ],
                synchronize: false,
            }),
        ],
    })
], CronModule);
exports.CronModule = CronModule;
//# sourceMappingURL=cron.module.js.map