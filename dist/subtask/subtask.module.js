"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtaskModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const subtask_entity_1 = require("../entities/subtask.entity");
const subtask_controller_1 = require("./subtask.controller");
const subtask_service_1 = require("./subtask.service");
const helper_module_1 = require("../helper/helper.module");
const tasktype_module_1 = require("../tasktype/tasktype.module");
let subtaskModule = class subtaskModule {
};
subtaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            helper_module_1.HelperModule,
            typeorm_1.TypeOrmModule.forFeature([subtask_entity_1.Subtask]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            tasktype_module_1.tasktypeModule,
        ],
        controllers: [subtask_controller_1.subtaskController],
        providers: [subtask_service_1.subtaskService],
        exports: [subtask_service_1.subtaskService],
    })
], subtaskModule);
exports.subtaskModule = subtaskModule;
//# sourceMappingURL=subtask.module.js.map