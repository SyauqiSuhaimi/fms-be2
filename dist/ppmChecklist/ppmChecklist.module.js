"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ppmChecklistModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const ppmChecklist_entity_1 = require("../entities/ppmChecklist.entity");
const ppmChecklist_controller_1 = require("./ppmChecklist.controller");
const ppmChecklist_service_1 = require("./ppmChecklist.service");
const helper_module_1 = require("../helper/helper.module");
let ppmChecklistModule = class ppmChecklistModule {
};
ppmChecklistModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ppmChecklist_entity_1.ppmChecklist]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            helper_module_1.HelperModule,
        ],
        controllers: [ppmChecklist_controller_1.ppmChecklistController],
        providers: [ppmChecklist_service_1.ppmChecklistService],
    })
], ppmChecklistModule);
exports.ppmChecklistModule = ppmChecklistModule;
//# sourceMappingURL=ppmChecklist.module.js.map