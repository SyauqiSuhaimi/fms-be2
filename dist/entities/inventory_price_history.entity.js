"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory_Price_History = void 0;
const typeorm_1 = require("typeorm");
const inventory_entity_1 = require("./inventory.entity");
const inventory_usage_entity_1 = require("./inventory_usage.entity");
let Inventory_Price_History = class Inventory_Price_History {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inventory_Price_History.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Inventory_Price_History.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Inventory_Price_History.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], Inventory_Price_History.prototype, "resit_attachment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_usage_entity_1.Inventory_Usage, (inventoryusage) => inventoryusage.inventorypricehistory, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Inventory_Price_History.prototype, "inventoryusage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventory_entity_1.Inventory, (inventory) => inventory.inventorypricehistory, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        nullable: true,
    }),
    __metadata("design:type", inventory_entity_1.Inventory)
], Inventory_Price_History.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => inventory_entity_1.Inventory, (inventoryprice) => inventoryprice.effectivePrice, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", inventory_entity_1.Inventory)
], Inventory_Price_History.prototype, "inventoryprice", void 0);
Inventory_Price_History = __decorate([
    (0, typeorm_1.Entity)("inventory_price_history")
], Inventory_Price_History);
exports.Inventory_Price_History = Inventory_Price_History;
//# sourceMappingURL=inventory_price_history.entity.js.map