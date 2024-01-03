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
exports.ServiceContract = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const equipment_entity_1 = require("./equipment.entity");
const case_entity_1 = require("./case.entity");
const ppmChecklist_entity_1 = require("./ppmChecklist.entity");
const vendor_entity_1 = require("./vendor.entity");
let ServiceContract = class ServiceContract {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ServiceContract.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], ServiceContract.prototype, "refno", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor, (vendor) => vendor.servicecontract, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", vendor_entity_1.Vendor)
], ServiceContract.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "contract_start", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "contract_end", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Boolean)
], ServiceContract.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], ServiceContract.prototype, "contract_value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.servicecontract, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], ServiceContract.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => equipment_entity_1.Equipment, (equipment) => equipment.servicecontract, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinTable)({
        name: "equipmentservicecontract",
        joinColumn: {
            referencedColumnName: "id",
            name: "servicecontract_id",
        },
        inverseJoinColumn: {
            referencedColumnName: "id",
            name: "equipment_id",
        },
    }),
    __metadata("design:type", Array)
], ServiceContract.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (cases) => cases.effectiveServicecontract, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Array)
], ServiceContract.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ppmChecklist_entity_1.ppmChecklist, (ppmchecklist) => ppmchecklist.serviceContract, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", ppmChecklist_entity_1.ppmChecklist)
], ServiceContract.prototype, "ppmchecklist", void 0);
ServiceContract = __decorate([
    (0, typeorm_1.Entity)("servicecontract")
], ServiceContract);
exports.ServiceContract = ServiceContract;
//# sourceMappingURL=serviceContract.entity.js.map