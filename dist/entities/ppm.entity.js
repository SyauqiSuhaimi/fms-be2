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
exports.PPM = void 0;
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("./equipment.entity");
const case_entity_1 = require("./case.entity");
const ppmChecklist_entity_1 = require("./ppmChecklist.entity");
const tempppm_entity_1 = require("./tempppm.entity");
let PPM = class PPM {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PPM.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], PPM.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], PPM.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], PPM.prototype, "interval", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment, (equipment) => equipment.ppm, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", equipment_entity_1.Equipment)
], PPM.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (cases) => cases.ppm, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], PPM.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Boolean)
], PPM.prototype, "onholiday", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], PPM.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    __metadata("design:type", Number)
], PPM.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    __metadata("design:type", Number)
], PPM.prototype, "previous_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    __metadata("design:type", Number)
], PPM.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, nullable: true }),
    __metadata("design:type", Boolean)
], PPM.prototype, "replaceable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", default: null, nullable: true }),
    __metadata("design:type", Number)
], PPM.prototype, "expected_duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Daily" }),
    __metadata("design:type", String)
], PPM.prototype, "precision", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ppmChecklist_entity_1.ppmChecklist, (ppmChecklist) => ppmChecklist.ppm, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
        eager: true,
    }),
    __metadata("design:type", ppmChecklist_entity_1.ppmChecklist)
], PPM.prototype, "ppmchecklist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tempppm_entity_1.tempPpm, (tempPpm) => tempPpm.ppm, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Array)
], PPM.prototype, "tempPpm", void 0);
PPM = __decorate([
    (0, typeorm_1.Entity)("ppm")
], PPM);
exports.PPM = PPM;
//# sourceMappingURL=ppm.entity.js.map