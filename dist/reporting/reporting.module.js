"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportingModule = void 0;
const common_1 = require("@nestjs/common");
const reporting_controller_1 = require("./reporting.controller");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const reporting_entity_1 = require("./entities/reporting.entity");
const case_service_1 = require("../case/case.service");
const case_entity_1 = require("../entities/case.entity");
const equipment_entity_1 = require("../entities/equipment.entity");
const equipment_service_1 = require("../equipment/equipment.service");
const user_entity_1 = require("../auth/user.entity");
const area_entity_1 = require("../entities/area.entity");
const caseHistory_entity_1 = require("../entities/caseHistory.entity");
const caseType_entity_1 = require("../entities/caseType.entity");
const company_entity_1 = require("../entities/company.entity");
const department_entity_1 = require("../entities/department.entity");
const holiday_entity_1 = require("../entities/holiday.entity");
const serviceContract_entity_1 = require("../entities/serviceContract.entity");
const subArea_entity_1 = require("../entities/subArea.entity");
const vendor_entity_1 = require("../entities/vendor.entity");
const auth_service_1 = require("../auth/auth.service");
const usertype_entity_1 = require("../auth/usertype.entity");
const userpermission_entity_1 = require("../auth/userpermission.entity");
const feature_entity_1 = require("../auth/feature.entity");
const news_service_1 = require("../news/news.service");
const news_entity_1 = require("../entities/news.entity");
const department_service_1 = require("../department/department.service");
const worktrade_service_1 = require("../workTrade/worktrade.service");
const workTrade_entity_1 = require("../entities/workTrade.entity");
const Eq_Brand_service_1 = require("../Eq_Brand/Eq_Brand.service");
const eq_type_entity_1 = require("../entities/eq_type.entity");
const eq_brand_entity_1 = require("../entities/eq_brand.entity");
const eq_model_entity_1 = require("../entities/eq_model.entity");
const Eq_Type_service_1 = require("../Eq_Type/Eq_Type.service");
const Eq_Class_service_1 = require("../Eq_Class/Eq_Class.service");
const Eq_Model_service_1 = require("../Eq_Model/Eq_Model.service");
const eq_classification_entity_1 = require("../entities/eq_classification.entity");
const general_service_1 = require("../helper/general.service");
const equipment_history_module_1 = require("../equipment_history/equipment_history.module");
let ReportingModule = class ReportingModule {
};
ReportingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                reporting_entity_1.Reporting,
                case_entity_1.Case,
                equipment_entity_1.Equipment,
                user_entity_1.User,
                area_entity_1.Area,
                caseHistory_entity_1.CaseHistory,
                caseType_entity_1.CaseType,
                company_entity_1.Company,
                department_entity_1.Department,
                holiday_entity_1.Holiday,
                serviceContract_entity_1.ServiceContract,
                subArea_entity_1.SubArea,
                vendor_entity_1.Vendor,
                usertype_entity_1.userType,
                userpermission_entity_1.userPermission,
                feature_entity_1.Feature,
                news_entity_1.News,
                workTrade_entity_1.WorkTrade,
                eq_type_entity_1.Eq_Type,
                eq_brand_entity_1.Eq_Brand,
                eq_classification_entity_1.Eq_Classifications,
                eq_model_entity_1.Eq_Model,
            ]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            equipment_history_module_1.Equipment_HistoryModel,
        ],
        controllers: [reporting_controller_1.ReportingController],
        providers: [
            case_service_1.CaseService,
            equipment_service_1.EquipmentService,
            auth_service_1.AuthService,
            news_service_1.NewsService,
            department_service_1.DepartmentService,
            worktrade_service_1.WorkTradeService,
            Eq_Brand_service_1.Eq_BrandService,
            Eq_Type_service_1.Eq_TypeService,
            Eq_Class_service_1.Eq_ClassService,
            Eq_Model_service_1.Eq_ModelService,
            general_service_1.GeneralService,
        ],
    })
], ReportingModule);
exports.ReportingModule = ReportingModule;
//# sourceMappingURL=reporting.module.js.map