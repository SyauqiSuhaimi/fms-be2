"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manufactureModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const manufacture_entity_1 = require("../entities/manufacture.entity");
const manufacture_controller_1 = require("./manufacture.controller");
const manufacture_service_1 = require("./manufacture.service");
const helper_module_1 = require("../helper/helper.module");
let manufactureModule = class manufactureModule {
};
manufactureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([manufacture_entity_1.manufacture]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            helper_module_1.HelperModule,
        ],
        controllers: [manufacture_controller_1.manufactureController],
        providers: [manufacture_service_1.manufactureService],
        exports: [manufacture_service_1.manufactureService],
    })
], manufactureModule);
exports.manufactureModule = manufactureModule;
//# sourceMappingURL=manufacture.module.js.map