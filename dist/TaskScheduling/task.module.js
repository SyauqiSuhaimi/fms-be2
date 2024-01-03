"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const task_controller_1 = require("./task.controller");
const task_service_1 = require("./task.service");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const case_module_1 = require("../case/case.module");
const case_entity_1 = require("../entities/case.entity");
const notification_module_1 = require("../notification/notification.module");
const gateway_module_1 = require("../GatewayHandler/gateway.module");
const auth_module_1 = require("../auth/auth.module");
let taskModule = class taskModule {
};
taskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([case_entity_1.Case]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret",
                signOptions: {
                    expiresIn: process.env.DAY_TOKEN ? process.env.DAY_TOKEN : "1d",
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            case_module_1.CaseModule,
            notification_module_1.NotificationsModule,
            gateway_module_1.GatewayModule,
            auth_module_1.AuthModule,
        ],
        controllers: [task_controller_1.taskController],
        providers: [
            task_service_1.TasksService,
        ],
        exports: [task_service_1.TasksService],
    })
], taskModule);
exports.taskModule = taskModule;
//# sourceMappingURL=task.module.js.map