"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasktypeModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const tasktype_entity_1 = require("../entities/tasktype.entity");
const tasktype_controller_1 = require("./tasktype.controller");
const tasktype_service_1 = require("./tasktype.service");
const helper_module_1 = require("../helper/helper.module");
let tasktypeModule = class tasktypeModule {
};
tasktypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            helper_module_1.HelperModule,
            typeorm_1.TypeOrmModule.forFeature([tasktype_entity_1.taskType]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
        ],
        controllers: [tasktype_controller_1.tasktypeController],
        providers: [tasktype_service_1.tasktypeService],
        exports: [tasktype_service_1.tasktypeService],
    })
], tasktypeModule);
exports.tasktypeModule = tasktypeModule;
//# sourceMappingURL=tasktype.module.js.map