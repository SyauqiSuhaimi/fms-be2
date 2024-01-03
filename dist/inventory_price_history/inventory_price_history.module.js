"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory_Price_historyModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const helper_module_1 = require("../helper/helper.module");
const inventory_price_history_entity_1 = require("../entities/inventory_price_history.entity");
const inventory_price_history_controller_1 = require("./inventory_price_history.controller");
const inventory_price_history_service_1 = require("./inventory_price_history.service");
let Inventory_Price_historyModule = class Inventory_Price_historyModule {
};
Inventory_Price_historyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([inventory_price_history_entity_1.Inventory_Price_History]),
            jwt_1.JwtModule.register({
                secret: "secret",
                signOptions: { expiresIn: "7d" },
            }),
            helper_module_1.HelperModule,
        ],
        controllers: [inventory_price_history_controller_1.Inventory_Price_HistoryController],
        providers: [inventory_price_history_service_1.Inventory_Price_historyService],
        exports: [inventory_price_history_service_1.Inventory_Price_historyService],
    })
], Inventory_Price_historyModule);
exports.Inventory_Price_historyModule = Inventory_Price_historyModule;
//# sourceMappingURL=inventory_price_history.module.js.map