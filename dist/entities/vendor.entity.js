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
exports.Vendor = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const serviceContract_entity_1 = require("./serviceContract.entity");
const mda_entity_1 = require("./mda.entity");
const equipment_entity_1 = require("./equipment.entity");
let Vendor = class Vendor {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vendor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Vendor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], Vendor.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => serviceContract_entity_1.ServiceContract, (serviceContract) => serviceContract.vendor, { onDelete: "SET NULL", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], Vendor.prototype, "servicecontract", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mda_entity_1.mda, (mda) => mda.vendor, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Vendor.prototype, "mda", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipment_entity_1.Equipment, (equipment) => equipment.main_supplier, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Vendor.prototype, "equipment", void 0);
Vendor = __decorate([
    (0, typeorm_1.Entity)("vendor")
], Vendor);
exports.Vendor = Vendor;
//# sourceMappingURL=vendor.entity.js.map