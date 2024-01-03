"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentModel = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const equipment_entity_1 = require("../entities/equipment.entity");
const equipment_controller_1 = require("./equipment.controller");
const equipment_service_1 = require("./equipment.service");
const user_entity_1 = require("../auth/user.entity");
const jwt_1 = require("@nestjs/jwt");
const Eq_Brand_service_1 = require("../Eq_Brand/Eq_Brand.service");
const eq_type_entity_1 = require("../entities/eq_type.entity");
const eq_brand_entity_1 = require("../entities/eq_brand.entity");
const Eq_Type_service_1 = require("../Eq_Type/Eq_Type.service");
const Eq_Class_service_1 = require("../Eq_Class/Eq_Class.service");
const eq_classification_entity_1 = require("../entities/eq_classification.entity");
const group_list_module_1 = require("../Group_list/group_list.module");
const Eq_Model_module_1 = require("../Eq_Model/Eq_Model.module");
const department_module_1 = require("../department/department.module");
const helper_module_1 = require("../helper/helper.module");
const asset_status_module_1 = require("../asset_status/asset_status.module");
const contract_module_1 = require("../service-contract/contract.module");
const mda_module_1 = require("../mda/mda.module");
const category_modulte_1 = require("../category/category.modulte");
const asset_group_module_1 = require("../asset_group/asset_group.module");
const equipment_status_module_1 = require("../eq_status/equipment_status.module");
const equipment_history_module_1 = require("../equipment_history/equipment_history.module");
const vo_status_module_1 = require("../vo_status/vo_status.module");
const vendor_module_1 = require("../vendor/vendor.module");
const umdns_module_1 = require("../umdns/umdns.module");
const manufacture_module_1 = require("../manufacture/manufacture.module");
const case_module_1 = require("../case/case.module");
let EquipmentModel = class EquipmentModel {
};
EquipmentModel = __decorate([
    (0, common_1.Module)({
        imports: [
            group_list_module_1.GroupListModule,
            Eq_Model_module_1.Eq_ModelModule,
            typeorm_1.TypeOrmModule.forFeature([
                equipment_entity_1.Equipment,
                user_entity_1.User,
                eq_type_entity_1.Eq_Type,
                eq_brand_entity_1.Eq_Brand,
                eq_classification_entity_1.Eq_Classifications,
            ]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            helper_module_1.HelperModule,
            department_module_1.DepartmentModule,
            asset_status_module_1.asset_statusModule,
            contract_module_1.ContractModule,
            mda_module_1.mdaModule,
            category_modulte_1.categoryModule,
            asset_group_module_1.asset_groupModule,
            equipment_status_module_1.equipment_statusModule,
            equipment_history_module_1.Equipment_HistoryModel,
            vo_status_module_1.vo_statusModule,
            vendor_module_1.VendorModule,
            umdns_module_1.umdnsModule,
            manufacture_module_1.manufactureModule,
            asset_status_module_1.asset_statusModule,
            (0, common_1.forwardRef)(() => case_module_1.CaseModule),
        ],
        controllers: [equipment_controller_1.EquipmentController],
        providers: [
            equipment_service_1.EquipmentService,
            Eq_Brand_service_1.Eq_BrandService,
            Eq_Type_service_1.Eq_TypeService,
            Eq_Class_service_1.Eq_ClassService,
        ],
        exports: [equipment_service_1.EquipmentService],
    })
], EquipmentModel);
exports.EquipmentModel = EquipmentModel;
//# sourceMappingURL=equipment.module.js.map