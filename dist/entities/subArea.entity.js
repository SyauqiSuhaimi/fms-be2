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
exports.SubArea = void 0;
const typeorm_1 = require("typeorm");
const area_entity_1 = require("./area.entity");
const case_entity_1 = require("./case.entity");
const equipment_entity_1 = require("./equipment.entity");
let SubArea = class SubArea {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubArea.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], SubArea.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], SubArea.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => area_entity_1.Area, (area) => area.subarea, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", area_entity_1.Area)
], SubArea.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipment_entity_1.Equipment, (equipment) => equipment.subarea, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], SubArea.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (cases) => cases.fromsubarea, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], SubArea.prototype, "fromcases", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (tocases) => tocases.tosubarea, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], SubArea.prototype, "tocases", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (cases) => cases.location, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], SubArea.prototype, "nomad_cases", void 0);
SubArea = __decorate([
    (0, typeorm_1.Entity)("subarea")
], SubArea);
exports.SubArea = SubArea;
//# sourceMappingURL=subArea.entity.js.map