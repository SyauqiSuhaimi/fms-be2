"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupListModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const groupList_entity_1 = require("../entities/groupList.entity");
const group_list_controller_1 = require("./group_list.controller");
const group_list_service_1 = require("./group_list.service");
const workTrade_entity_1 = require("../entities/workTrade.entity");
const user_entity_1 = require("../auth/user.entity");
const worktrade_module_1 = require("../workTrade/worktrade.module");
const helper_module_1 = require("../helper/helper.module");
let GroupListModule = class GroupListModule {
};
GroupListModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([groupList_entity_1.GroupList, workTrade_entity_1.WorkTrade, user_entity_1.User]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            worktrade_module_1.WorkTradeModule,
            helper_module_1.HelperModule,
        ],
        controllers: [group_list_controller_1.GroupListController],
        providers: [group_list_service_1.GroupListService],
        exports: [group_list_service_1.GroupListService],
    })
], GroupListModule);
exports.GroupListModule = GroupListModule;
//# sourceMappingURL=group_list.module.js.map