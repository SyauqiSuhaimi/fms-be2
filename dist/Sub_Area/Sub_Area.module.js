"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubAreaModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const subArea_entity_1 = require("../entities/subArea.entity");
const Sub_Area_controller_1 = require("./Sub_Area.controller");
const Sub_Area_service_1 = require("./Sub_Area.service");
const helper_module_1 = require("../helper/helper.module");
let SubAreaModule = class SubAreaModule {
};
SubAreaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            helper_module_1.HelperModule,
            typeorm_1.TypeOrmModule.forFeature([subArea_entity_1.SubArea]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        controllers: [Sub_Area_controller_1.SubAreaController],
        providers: [Sub_Area_service_1.SubAreaService],
        exports: [Sub_Area_service_1.SubAreaService],
    })
], SubAreaModule);
exports.SubAreaModule = SubAreaModule;
//# sourceMappingURL=Sub_Area.module.js.map