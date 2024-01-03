"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const area_entity_1 = require("../entities/area.entity");
const Area_controller_1 = require("./Area.controller");
const Area_service_1 = require("./Area.service");
const helper_module_1 = require("../helper/helper.module");
let AreaModule = class AreaModule {
};
AreaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([area_entity_1.Area]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            helper_module_1.HelperModule,
        ],
        controllers: [Area_controller_1.AreaController],
        providers: [Area_service_1.AreaService],
        exports: [Area_service_1.AreaService],
    })
], AreaModule);
exports.AreaModule = AreaModule;
//# sourceMappingURL=Area.module.js.map