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
exports.Eq_Type = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const equipment_entity_1 = require("./equipment.entity");
const workTrade_entity_1 = require("./workTrade.entity");
const inventory_entity_1 = require("./inventory.entity");
const case_entity_1 = require("./case.entity");
const groupMain_entity_1 = require("./groupMain.entity");
const ppmChecklist_entity_1 = require("./ppmChecklist.entity");
let Eq_Type = class Eq_Type {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Eq_Type.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Eq_Type.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Eq_Type.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipment_entity_1.Equipment, (equipment) => equipment.eq_type, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Eq_Type.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.eq_type, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], Eq_Type.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workTrade_entity_1.WorkTrade, (worktrade) => worktrade.eq_type, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", workTrade_entity_1.WorkTrade)
], Eq_Type.prototype, "worktrade", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => inventory_entity_1.Inventory, (inventory) => inventory.eqtype, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", inventory_entity_1.Inventory)
], Eq_Type.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (cases) => cases.equipment_type, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Eq_Type.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => groupMain_entity_1.GroupMain, (groupmain) => groupmain.eqtype),
    __metadata("design:type", groupMain_entity_1.GroupMain)
], Eq_Type.prototype, "groupmain", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ppmChecklist_entity_1.ppmChecklist, (ppmchecklist) => ppmchecklist.eqtype),
    __metadata("design:type", Array)
], Eq_Type.prototype, "ppmchecklist", void 0);
Eq_Type = __decorate([
    (0, typeorm_1.Entity)("eq_type")
], Eq_Type);
exports.Eq_Type = Eq_Type;
//# sourceMappingURL=eq_type.entity.js.map