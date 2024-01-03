"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const news_module_1 = require("./news/news.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const dist_1 = require("@nestjs/jwt/dist");
const usertype_entity_1 = require("./auth/usertype.entity");
const userpermission_entity_1 = require("./auth/userpermission.entity");
const feature_entity_1 = require("./auth/feature.entity");
const user_entity_1 = require("./auth/user.entity");
const auth_module_1 = require("./auth/auth.module");
const department_entity_1 = require("./entities/department.entity");
const equipment_entity_1 = require("./entities/equipment.entity");
const case_entity_1 = require("./entities/case.entity");
const caseHistory_entity_1 = require("./entities/caseHistory.entity");
const company_entity_1 = require("./entities/company.entity");
const groupCompany_entity_1 = require("./entities/groupCompany.entity");
const maintenance_entity_1 = require("./entities/maintenance.entity");
const serviceContract_entity_1 = require("./entities/serviceContract.entity");
const config_1 = require("@nestjs/config");
const equipment_module_1 = require("./equipment/equipment.module");
const area_entity_1 = require("./entities/area.entity");
const subArea_entity_1 = require("./entities/subArea.entity");
const caseType_entity_1 = require("./entities/caseType.entity");
const workTrade_entity_1 = require("./entities/workTrade.entity");
const groupList_entity_1 = require("./entities/groupList.entity");
const company_module_1 = require("./company/company.module");
const worktrade_module_1 = require("./workTrade/worktrade.module");
const contract_module_1 = require("./service-contract/contract.module");
const department_module_1 = require("./department/department.module");
const case_module_1 = require("./case/case.module");
const group_company_module_1 = require("./Group_Company/group_company.module");
const group_list_module_1 = require("./Group_list/group_list.module");
const Case_Type_module_1 = require("./Case_Type/Case_Type.module");
const Case_History_module_1 = require("./Case_History/Case_History.module");
const Maintenance_module_1 = require("./Maintenance/Maintenance.module");
const Area_module_1 = require("./Area/Area.module");
const Sub_Area_module_1 = require("./Sub_Area/Sub_Area.module");
const gateway_module_1 = require("./GatewayHandler/gateway.module");
const technician_entity_1 = require("./entities/technician.entity");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const Technician_module_1 = require("./Technician/Technician.module");
const holiday_entity_1 = require("./entities/holiday.entity");
const holiday_module_1 = require("./holiday/holiday.module");
const case_status_entity_1 = require("./entities/case_status.entity");
const case_status_module_1 = require("./Case_Status/case_status.module");
const reporting_module_1 = require("./reporting/reporting.module");
const vendor_entity_1 = require("./entities/vendor.entity");
const ppm_entity_1 = require("./entities/ppm.entity");
const ppm_module_1 = require("./ppm/ppm.module");
const equipment_history_entity_1 = require("./entities/equipment_history.entity");
const equipment_status_entity_1 = require("./entities/equipment_status.entity");
const news_entity_1 = require("./entities/news.entity");
const eq_type_entity_1 = require("./entities/eq_type.entity");
const eq_classification_entity_1 = require("./entities/eq_classification.entity");
const eq_brand_entity_1 = require("./entities/eq_brand.entity");
const eq_model_entity_1 = require("./entities/eq_model.entity");
const Eq_Class_module_1 = require("./Eq_Class/Eq_Class.module");
const Eq_Type_module_1 = require("./Eq_Type/Eq_Type.module");
const Eq_Brand_module_1 = require("./Eq_Brand/Eq_Brand.module");
const Eq_Model_module_1 = require("./Eq_Model/Eq_Model.module");
const ppmChecklist_entity_1 = require("./entities/ppmChecklist.entity");
const ppmChecklist_module_1 = require("./ppmChecklist/ppmChecklist.module");
const tempPpm_module_1 = require("./tempPpm/tempPpm.module");
const tempppm_entity_1 = require("./entities/tempppm.entity");
const inventory_entity_1 = require("./entities/inventory.entity");
const notification_entity_1 = require("./entities/notification.entity");
const notification_module_1 = require("./notification/notification.module");
const inventory_module_1 = require("./Inventory/inventory.module");
const inventory_price_history_entity_1 = require("./entities/inventory_price_history.entity");
const task_service_1 = require("./TaskScheduling/task.service");
const schedule_1 = require("@nestjs/schedule");
const helper_module_1 = require("./helper/helper.module");
const panel_entity_1 = require("./entities/panel.entity");
const paneltype_entity_1 = require("./entities/paneltype.entity");
const workspace_entity_1 = require("./entities/workspace.entity");
const panel_module_1 = require("./panel/panel.module");
const paneltype_module_1 = require("./panelType/paneltype.module");
const workspace_module_1 = require("./workspace/workspace.module");
const inventory_usage_entity_1 = require("./entities/inventory_usage.entity");
const inventory_price_history_module_1 = require("./inventory_price_history/inventory_price_history.module");
const category_entity_1 = require("./entities/category.entity");
const category_cost_entity_1 = require("./entities/category_cost.entity");
const category_critical_entity_1 = require("./entities/category_critical.entity");
const inventory_usage_module_1 = require("./inventory_usage/inventory_usage.module");
const equipment_history_module_1 = require("./equipment_history/equipment_history.module");
const deduction_entity_1 = require("./entities/deduction.entity");
const rating_entity_1 = require("./entities/rating.entity");
const rating_module_1 = require("./rating/rating.module");
const deduction_module_1 = require("./deduction/deduction.module");
const groupMain_entity_1 = require("./entities/groupMain.entity");
const vendor_module_1 = require("./vendor/vendor.module");
const project_entity_1 = require("./entities/project.entity");
const disposal_status_entity_1 = require("./entities/disposal_status.entity");
const mda_entity_1 = require("./entities/mda.entity");
const asset_status_entity_1 = require("./entities/asset_status.entity");
const defect_entity_1 = require("./entities/defect.entity");
const defect_module_1 = require("./defect/defect.module");
const project_module_1 = require("./project/project.module");
const mda_module_1 = require("./mda/mda.module");
const eq_matric_entity_1 = require("./entities/eq_matric.entity");
const category_modulte_1 = require("./category/category.modulte");
const asset_group_entity_1 = require("./entities/asset_group.entity");
const asset_group_module_1 = require("./asset_group/asset_group.module");
const equipment_status_module_1 = require("./eq_status/equipment_status.module");
const subtask_entity_1 = require("./entities/subtask.entity");
const tasktype_entity_1 = require("./entities/tasktype.entity");
const subtask_module_1 = require("./subtask/subtask.module");
const tasktype_module_1 = require("./tasktype/tasktype.module");
const vo_status_module_1 = require("./vo_status/vo_status.module");
const vo_status_entity_1 = require("./entities/vo_status.entity");
const umdns_entity_1 = require("./entities/umdns.entity");
const umdns_module_1 = require("./umdns/umdns.module");
const manufacture_module_1 = require("./manufacture/manufacture.module");
const manufacture_entity_1 = require("./entities/manufacture.entity");
const qc_code_module_1 = require("./qc_code/qc_code.module");
const qc_code_entity_1 = require("./entities/qc_code.entity");
const qc_entity_1 = require("./entities/qc.entity");
const qc_module_1 = require("./qc/qc.module");
const common_2 = require("@nestjs/common");
const winston_module_1 = require("./logModule/winston.module");
const transfer_entity_1 = require("./entities/transfer.entity");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(winston_module_1.WinstonModule)
            .forRoutes({ path: "*", method: common_2.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
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
                    panel_entity_1.Panel,
                    paneltype_entity_1.PanelType,
                    workspace_entity_1.workspace,
                    inventory_usage_entity_1.Inventory_Usage,
                    category_entity_1.Category,
                    category_cost_entity_1.Category_cost,
                    category_critical_entity_1.Category_critical,
                    deduction_entity_1.Deduction,
                    rating_entity_1.Rating,
                    groupMain_entity_1.GroupMain,
                    project_entity_1.project,
                    disposal_status_entity_1.disposal_status,
                    mda_entity_1.mda,
                    asset_status_entity_1.Asset_Status,
                    defect_entity_1.defect,
                    eq_matric_entity_1.eq_matric,
                    asset_group_entity_1.asset_group,
                    subtask_entity_1.Subtask,
                    tasktype_entity_1.taskType,
                    vo_status_entity_1.vo_status,
                    umdns_entity_1.umdns,
                    manufacture_entity_1.manufacture,
                    qc_code_entity_1.Qc_codeEntity,
                    qc_entity_1.qc,
                    transfer_entity_1.transfer,
                ],
                synchronize: process.env.DB_SYNC == "true" ? true : false,
            }),
            dist_1.JwtModule.register({
                secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret",
                signOptions: {
                    expiresIn: process.env.DAY_TOKEN ? process.env.DAY_TOKEN : "7d",
                },
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: parseInt(process.env.MINIT ? process.env.MINIT : "none"),
                limit: parseInt(process.env.LIMIT ? process.env.LIMIT : "none"),
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            gateway_module_1.GatewayModule,
            equipment_module_1.EquipmentModel,
            company_module_1.CompanyModule,
            worktrade_module_1.WorkTradeModule,
            contract_module_1.ContractModule,
            department_module_1.DepartmentModule,
            case_module_1.CaseModule,
            group_company_module_1.GroupCompanyModule,
            group_list_module_1.GroupListModule,
            Case_Type_module_1.CaseTypeModule,
            Case_History_module_1.CaseHistoryModule,
            Maintenance_module_1.MaintenanceModule,
            Area_module_1.AreaModule,
            Sub_Area_module_1.SubAreaModule,
            Technician_module_1.TechnicianModel,
            holiday_module_1.holidayModule,
            case_status_module_1.Case_StatusModule,
            reporting_module_1.ReportingModule,
            ppm_module_1.PPMModule,
            news_module_1.NewsModule,
            Eq_Class_module_1.Eq_ClassModule,
            Eq_Type_module_1.Eq_TypeModule,
            Eq_Brand_module_1.Eq_BrandModule,
            Eq_Model_module_1.Eq_ModelModule,
            ppmChecklist_module_1.ppmChecklistModule,
            tempPpm_module_1.tempPpmModule,
            notification_module_1.NotificationsModule,
            inventory_module_1.InventoryModule,
            inventory_price_history_module_1.Inventory_Price_historyModule,
            helper_module_1.HelperModule,
            panel_module_1.PanelModule,
            paneltype_module_1.PanelTypeModule,
            workspace_module_1.WorkspaceModule,
            inventory_usage_module_1.Inventory_UsageModule,
            equipment_history_module_1.Equipment_HistoryModel,
            rating_module_1.RatingModule,
            deduction_module_1.DeductionModule,
            vendor_module_1.VendorModule,
            defect_module_1.defectModule,
            project_module_1.projectModule,
            mda_module_1.mdaModule,
            category_modulte_1.categoryModule,
            asset_group_module_1.asset_groupModule,
            equipment_status_module_1.equipment_statusModule,
            subtask_module_1.subtaskModule,
            tasktype_module_1.tasktypeModule,
            vo_status_module_1.vo_statusModule,
            umdns_module_1.umdnsModule,
            manufacture_module_1.manufactureModule,
            qc_code_module_1.Qc_codeModule,
            qc_module_1.qcModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            app_service_1.AppService,
            task_service_1.TasksService,
        ],
        exports: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map