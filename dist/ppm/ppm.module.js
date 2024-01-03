"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PPMModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ppm_controller_1 = require("./ppm.controller");
const ppm_service_1 = require("./ppm.service");
const jwt_1 = require("@nestjs/jwt");
const ppm_entity_1 = require("../entities/ppm.entity");
const holiday_service_1 = require("../holiday/holiday.service");
const holiday_entity_1 = require("../entities/holiday.entity");
const company_service_1 = require("../company/company.service");
const company_entity_1 = require("../entities/company.entity");
const helper_module_1 = require("../helper/helper.module");
let PPMModule = class PPMModule {
};
PPMModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ppm_entity_1.PPM, holiday_entity_1.Holiday, company_entity_1.Company]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            helper_module_1.HelperModule,
        ],
        controllers: [ppm_controller_1.PPMController],
        providers: [ppm_service_1.PPMService, holiday_service_1.HolidayService, company_service_1.CompanyService],
    })
], PPMModule);
exports.PPMModule = PPMModule;
//# sourceMappingURL=ppm.module.js.map