"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Case_Type_controller_1 = require("./Case_Type.controller");
const Case_Type_service_1 = require("./Case_Type.service");
const caseType_entity_1 = require("../entities/caseType.entity");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../auth/user.entity");
const helper_module_1 = require("../helper/helper.module");
let CaseTypeModule = class CaseTypeModule {
};
CaseTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            helper_module_1.HelperModule,
            typeorm_1.TypeOrmModule.forFeature([caseType_entity_1.CaseType, user_entity_1.User]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        controllers: [Case_Type_controller_1.CaseTypeController],
        providers: [Case_Type_service_1.CaseTypeService],
        exports: [Case_Type_service_1.CaseTypeService],
    })
], CaseTypeModule);
exports.CaseTypeModule = CaseTypeModule;
//# sourceMappingURL=Case_Type.module.js.map