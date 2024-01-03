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
exports.Inventory = void 0;
const typeorm_1 = require("typeorm");
const caseHistory_entity_1 = require("./caseHistory.entity");
const eq_type_entity_1 = require("./eq_type.entity");
const company_entity_1 = require("./company.entity");
const inventory_price_history_entity_1 = require("./inventory_price_history.entity");
const inventory_usage_entity_1 = require("./inventory_usage.entity");
let Inventory = class Inventory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inventory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Inventory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], Inventory.prototype, "attachment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.inventory, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], Inventory.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => caseHistory_entity_1.CaseHistory, (casehistory) => casehistory.inventory, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", Array)
], Inventory.prototype, "casehistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_price_history_entity_1.Inventory_Price_History, (inventorypricehistory) => inventorypricehistory.inventory, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Array)
], Inventory.prototype, "inventorypricehistory", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => inventory_price_history_entity_1.Inventory_Price_History, (inventorypricehistory) => inventorypricehistory.inventoryprice, {
        eager: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", inventory_price_history_entity_1.Inventory_Price_History)
], Inventory.prototype, "effectivePrice", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => eq_type_entity_1.Eq_Type, (eqtype) => eqtype.inventory, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinTable)({
        name: "eqtype_inventory",
        joinColumn: {
            referencedColumnName: "id",
            name: "inventory_id",
        },
        inverseJoinColumn: {
            referencedColumnName: "id",
            name: "eqtype_id",
        },
    }),
    __metadata("design:type", eq_type_entity_1.Eq_Type)
], Inventory.prototype, "eqtype", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_usage_entity_1.Inventory_Usage, (inventoryusage) => inventoryusage.inventory, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Inventory.prototype, "inventoryusage", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "lower_limit", void 0);
Inventory = __decorate([
    (0, typeorm_1.Entity)("inventory")
], Inventory);
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.entity.js.map