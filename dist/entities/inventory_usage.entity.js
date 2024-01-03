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
exports.Inventory_Usage = void 0;
const typeorm_1 = require("typeorm");
const inventory_entity_1 = require("./inventory.entity");
const case_entity_1 = require("./case.entity");
const caseHistory_entity_1 = require("./caseHistory.entity");
const inventory_price_history_entity_1 = require("./inventory_price_history.entity");
let Inventory_Usage = class Inventory_Usage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inventory_Usage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Inventory_Usage.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], Inventory_Usage.prototype, "datetime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventory_entity_1.Inventory, (inventory) => inventory.inventoryusage, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        nullable: true,
    }),
    __metadata("design:type", inventory_entity_1.Inventory)
], Inventory_Usage.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (cases) => cases.inventory_usage, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        nullable: true,
    }),
    __metadata("design:type", case_entity_1.Case)
], Inventory_Usage.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => caseHistory_entity_1.CaseHistory, (casehistory) => casehistory.inventoryusage, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", caseHistory_entity_1.CaseHistory)
], Inventory_Usage.prototype, "casehistory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventory_price_history_entity_1.Inventory_Price_History, (inventorypricehistory) => inventorypricehistory.inventoryusage, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        nullable: true,
    }),
    __metadata("design:type", inventory_price_history_entity_1.Inventory_Price_History)
], Inventory_Usage.prototype, "inventorypricehistory", void 0);
Inventory_Usage = __decorate([
    (0, typeorm_1.Entity)("inventory_usage")
], Inventory_Usage);
exports.Inventory_Usage = Inventory_Usage;
//# sourceMappingURL=inventory_usage.entity.js.map