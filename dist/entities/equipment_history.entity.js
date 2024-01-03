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
exports.Equipment_History = void 0;
const typeorm_1 = require("typeorm");
const equipment_status_entity_1 = require("./equipment_status.entity");
const equipment_entity_1 = require("./equipment.entity");
let Equipment_History = class Equipment_History {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Equipment_History.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment_History.prototype, "eqhistory_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment_History.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_status_entity_1.Equipment_Status, (equipment_status) => equipment_status.equipment_history, { onDelete: "SET NULL", onUpdate: "CASCADE", eager: true }),
    __metadata("design:type", equipment_status_entity_1.Equipment_Status)
], Equipment_History.prototype, "Equipment_Status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment, (equipment) => equipment.equipment_history, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", equipment_entity_1.Equipment)
], Equipment_History.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => equipment_entity_1.Equipment, (equipmenthistorystatus) => equipmenthistorystatus.status, {
        nullable: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", equipment_entity_1.Equipment)
], Equipment_History.prototype, "equipmenthistorystatus", void 0);
Equipment_History = __decorate([
    (0, typeorm_1.Entity)("equipment_history")
], Equipment_History);
exports.Equipment_History = Equipment_History;
//# sourceMappingURL=equipment_history.entity.js.map