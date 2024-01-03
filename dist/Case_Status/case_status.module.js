"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case_StatusModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const case_status_controller_1 = require("./case_status.controller");
const case_status_service_1 = require("./case_status.service");
const jwt_1 = require("@nestjs/jwt");
const case_status_entity_1 = require("../entities/case_status.entity");
const helper_module_1 = require("../helper/helper.module");
let Case_StatusModule = class Case_StatusModule {
};
Case_StatusModule = __decorate([
    (0, common_1.Module)({
        imports: [
            helper_module_1.HelperModule,
            typeorm_1.TypeOrmModule.forFeature([case_status_entity_1.Case_Status]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        controllers: [case_status_controller_1.Case_StatusController],
        providers: [case_status_service_1.Case_StatusService],
        exports: [case_status_service_1.Case_StatusService],
    })
], Case_StatusModule);
exports.Case_StatusModule = Case_StatusModule;
//# sourceMappingURL=case_status.module.js.map