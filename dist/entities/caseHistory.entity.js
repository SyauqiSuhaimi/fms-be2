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
exports.CaseHistory = void 0;
const user_entity_1 = require("../auth/user.entity");
const typeorm_1 = require("typeorm");
const case_entity_1 = require("./case.entity");
const inventory_entity_1 = require("./inventory.entity");
const notification_entity_1 = require("./notification.entity");
const case_status_entity_1 = require("./case_status.entity");
const inventory_usage_entity_1 = require("./inventory_usage.entity");
let CaseHistory = class CaseHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CaseHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], CaseHistory.prototype, "datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], CaseHistory.prototype, "tech_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], CaseHistory.prototype, "user_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], CaseHistory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], CaseHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], CaseHistory.prototype, "image_file", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], CaseHistory.prototype, "technician_sign", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], CaseHistory.prototype, "user_sign", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], CaseHistory.prototype, "user_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], CaseHistory.prototype, "material_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], CaseHistory.prototype, "labour_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], CaseHistory.prototype, "vendor_cost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (cases) => cases.casehistory, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", case_entity_1.Case)
], CaseHistory.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (updater) => updater.casehistory, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.User)
], CaseHistory.prototype, "updater", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.user_casehistory, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", user_entity_1.User)
], CaseHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => inventory_entity_1.Inventory, (inventory) => inventory.casehistory, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinTable)({
        name: "casehistory_inventory",
        joinColumn: {
            referencedColumnName: "id",
            name: "casehistory_id",
        },
        inverseJoinColumn: {
            referencedColumnName: "id",
            name: "inventory_id",
        },
    }),
    __metadata("design:type", inventory_entity_1.Inventory)
], CaseHistory.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notifications, (Notifications) => Notifications.casehistory, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], CaseHistory.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_status_entity_1.Case_Status, (old_status) => old_status.oldcasehitory, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", case_status_entity_1.Case_Status)
], CaseHistory.prototype, "old_status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_status_entity_1.Case_Status, (new_status) => new_status.newcasehitory, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", case_status_entity_1.Case_Status)
], CaseHistory.prototype, "new_status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_usage_entity_1.Inventory_Usage, (inventoryusage) => inventoryusage.casehistory, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], CaseHistory.prototype, "inventoryusage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], CaseHistory.prototype, "effect_labour_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], CaseHistory.prototype, "datetime2", void 0);
CaseHistory = __decorate([
    (0, typeorm_1.Entity)("casehistory")
], CaseHistory);
exports.CaseHistory = CaseHistory;
//# sourceMappingURL=caseHistory.entity.js.map