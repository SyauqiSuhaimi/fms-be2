"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eq_BrandModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const eq_brand_entity_1 = require("../entities/eq_brand.entity");
const eq_model_entity_1 = require("../entities/eq_model.entity");
const Eq_Model_service_1 = require("../Eq_Model/Eq_Model.service");
const Eq_Brand_controller_1 = require("./Eq_Brand.controller");
const Eq_Brand_service_1 = require("./Eq_Brand.service");
const helper_module_1 = require("../helper/helper.module");
let Eq_BrandModule = class Eq_BrandModule {
};
Eq_BrandModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([eq_brand_entity_1.Eq_Brand, eq_model_entity_1.Eq_Model]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            helper_module_1.HelperModule,
        ],
        controllers: [Eq_Brand_controller_1.Eq_BrandController],
        providers: [Eq_Brand_service_1.Eq_BrandService, Eq_Model_service_1.Eq_ModelService],
    })
], Eq_BrandModule);
exports.Eq_BrandModule = Eq_BrandModule;
//# sourceMappingURL=Eq_Brand.module.js.map