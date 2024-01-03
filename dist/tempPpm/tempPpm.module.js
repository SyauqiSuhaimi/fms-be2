"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempPpmModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const tempppm_entity_1 = require("../entities/tempppm.entity");
const tempPpm_controller_1 = require("./tempPpm.controller");
const tempPpm_service_1 = require("./tempPpm.service");
const helper_module_1 = require("../helper/helper.module");
let tempPpmModule = class tempPpmModule {
};
tempPpmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            helper_module_1.HelperModule,
            typeorm_1.TypeOrmModule.forFeature([tempppm_entity_1.tempPpm]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        controllers: [tempPpm_controller_1.tempPpmController],
        providers: [tempPpm_service_1.tempPpmService],
    })
], tempPpmModule);
exports.tempPpmModule = tempPpmModule;
//# sourceMappingURL=tempPpm.module.js.map