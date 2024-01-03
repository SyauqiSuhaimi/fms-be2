"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Qc_codeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const qc_code_controller_1 = require("./qc_code.controller");
const qc_code_entity_1 = require("../entities/qc_code.entity");
const qc_code_service_1 = require("./qc_code.service");
const jwt_1 = require("@nestjs/jwt");
const helper_module_1 = require("../helper/helper.module");
let Qc_codeModule = class Qc_codeModule {
};
Qc_codeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([qc_code_entity_1.Qc_codeEntity]),
            helper_module_1.HelperModule,
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        providers: [qc_code_service_1.Qc_codeService],
        controllers: [qc_code_controller_1.Qc_codeController],
    })
], Qc_codeModule);
exports.Qc_codeModule = Qc_codeModule;
//# sourceMappingURL=qc_code.module.js.map