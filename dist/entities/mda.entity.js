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
exports.mda = void 0;
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("./equipment.entity");
const vendor_entity_1 = require("./vendor.entity");
const project_entity_1 = require("./project.entity");
const company_entity_1 = require("./company.entity");
let mda = class mda {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], mda.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], mda.prototype, "mda_class_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], mda.prototype, "mda_registration_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], mda.prototype, "lar_registration_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], mda.prototype, "contract_no", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => equipment_entity_1.Equipment, (equipment) => equipment.disposal_status, {
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", equipment_entity_1.Equipment)
], mda.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor, (vendor) => vendor.mda, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", vendor_entity_1.Vendor)
], mda.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.project, (project) => project.mda, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", project_entity_1.project)
], mda.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.mda, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], mda.prototype, "company", void 0);
mda = __decorate([
    (0, typeorm_1.Entity)("mda")
], mda);
exports.mda = mda;
//# sourceMappingURL=mda.entity.js.map