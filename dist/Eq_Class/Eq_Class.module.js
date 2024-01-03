"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eq_ClassModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const eq_classification_entity_1 = require("../entities/eq_classification.entity");
const Eq_Class_controller_1 = require("./Eq_Class.controller");
const Eq_Class_service_1 = require("./Eq_Class.service");
const helper_module_1 = require("../helper/helper.module");
let Eq_ClassModule = class Eq_ClassModule {
};
Eq_ClassModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([eq_classification_entity_1.Eq_Classifications]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            helper_module_1.HelperModule,
        ],
        controllers: [Eq_Class_controller_1.Eq_ClassController],
        providers: [Eq_Class_service_1.Eq_ClassService],
    })
], Eq_ClassModule);
exports.Eq_ClassModule = Eq_ClassModule;
//# sourceMappingURL=Eq_Class.module.js.map