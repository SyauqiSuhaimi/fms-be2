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
exports.Case_Status = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("./case.entity");
const company_entity_1 = require("./company.entity");
const caseHistory_entity_1 = require("./caseHistory.entity");
let Case_Status = class Case_Status {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Case_Status.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Case_Status.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.case_status, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], Case_Status.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (cases) => cases.case_status, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Case_Status.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => caseHistory_entity_1.CaseHistory, (oldcasehitory) => oldcasehitory.old_status, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", caseHistory_entity_1.CaseHistory)
], Case_Status.prototype, "oldcasehitory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => caseHistory_entity_1.CaseHistory, (newcasehitory) => newcasehitory.new_status, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", caseHistory_entity_1.CaseHistory)
], Case_Status.prototype, "newcasehitory", void 0);
Case_Status = __decorate([
    (0, typeorm_1.Entity)("case_status")
], Case_Status);
exports.Case_Status = Case_Status;
//# sourceMappingURL=case_status.entity.js.map