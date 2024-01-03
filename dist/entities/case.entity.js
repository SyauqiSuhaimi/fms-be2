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
exports.Case = void 0;
const typeorm_1 = require("typeorm");
const maintenance_entity_1 = require("./maintenance.entity");
const caseHistory_entity_1 = require("./caseHistory.entity");
const equipment_entity_1 = require("./equipment.entity");
const caseType_entity_1 = require("./caseType.entity");
const workTrade_entity_1 = require("./workTrade.entity");
const user_entity_1 = require("../auth/user.entity");
const subArea_entity_1 = require("./subArea.entity");
const technician_entity_1 = require("./technician.entity");
const case_status_entity_1 = require("./case_status.entity");
const ppm_entity_1 = require("./ppm.entity");
const eq_type_entity_1 = require("./eq_type.entity");
const notification_entity_1 = require("./notification.entity");
const inventory_usage_entity_1 = require("./inventory_usage.entity");
const serviceContract_entity_1 = require("./serviceContract.entity");
const rating_entity_1 = require("./rating.entity");
const qc_code_entity_1 = require("./qc_code.entity");
const qc_entity_1 = require("./qc.entity");
const transfer_entity_1 = require("./transfer.entity");
let Case = class Case {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Case.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Case.prototype, "brought_forward", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], Case.prototype, "request_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (requestor) => requestor.cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Case.prototype, "requestor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Case.prototype, "contact_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Case.prototype, "mobile_no", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Case.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Case.prototype, "material_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Case.prototype, "labour_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Case.prototype, "vendor_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Case.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], Case.prototype, "image_file", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], Case.prototype, "expected_day_taken", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => maintenance_entity_1.Maintenance, (maintenance) => maintenance.cases, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", maintenance_entity_1.Maintenance)
], Case.prototype, "maintenance", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => caseHistory_entity_1.CaseHistory, (casehistory) => casehistory.cases, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Case.prototype, "casehistory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment, (equipment) => equipment.cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", equipment_entity_1.Equipment)
], Case.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => caseType_entity_1.CaseType, (casetype) => casetype.cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", caseType_entity_1.CaseType)
], Case.prototype, "casetype", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workTrade_entity_1.WorkTrade, (worktrade) => worktrade.cases, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", workTrade_entity_1.WorkTrade)
], Case.prototype, "worktrade", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subArea_entity_1.SubArea, (fromsubarea) => fromsubarea.fromcases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", subArea_entity_1.SubArea)
], Case.prototype, "fromsubarea", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subArea_entity_1.SubArea, (tosubarea) => tosubarea.tocases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", subArea_entity_1.SubArea)
], Case.prototype, "tosubarea", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subArea_entity_1.SubArea, (subarea) => subarea.nomad_cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", subArea_entity_1.SubArea)
], Case.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => technician_entity_1.Technician, (technician) => technician.cases, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Case.prototype, "technician", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_status_entity_1.Case_Status, (case_status) => case_status.cases, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", case_status_entity_1.Case_Status)
], Case.prototype, "case_status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ppm_entity_1.PPM, (ppm) => ppm.cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", ppm_entity_1.PPM)
], Case.prototype, "ppm", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Case.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Case.prototype, "inspected_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Case.prototype, "on_action_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Case.prototype, "action_done_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Case.prototype, "pause_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Case.prototype, "pause_duration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => eq_type_entity_1.Eq_Type, (equipment_type) => equipment_type.cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", eq_type_entity_1.Eq_Type)
], Case.prototype, "equipment_type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notifications, (Notifications) => Notifications.cases, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Case.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_usage_entity_1.Inventory_Usage, (inventory_usage) => inventory_usage.cases, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Case.prototype, "inventory_usage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => serviceContract_entity_1.ServiceContract, (servicecontract) => servicecontract.cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", serviceContract_entity_1.ServiceContract)
], Case.prototype, "effectiveServicecontract", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rating_entity_1.Rating, (rating) => rating.cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", rating_entity_1.Rating)
], Case.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => qc_code_entity_1.Qc_codeEntity, (qc_code) => qc_code.cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", qc_code_entity_1.Qc_codeEntity)
], Case.prototype, "qc_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Case.prototype, "work_prio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Case.prototype, "contact_designation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => qc_entity_1.qc, (qc) => qc.cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", qc_entity_1.qc)
], Case.prototype, "qc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Case.prototype, "contract_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Case.prototype, "cancel_remark", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => transfer_entity_1.transfer, (transfer) => transfer.case, {
        cascade: true,
        onDelete: "SET NULL",
    }),
    __metadata("design:type", transfer_entity_1.transfer)
], Case.prototype, "transfer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Case.prototype, "ppmdata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 1 }),
    __metadata("design:type", Number)
], Case.prototype, "formtype", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Case.prototype, "add_data", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    __metadata("design:type", Boolean)
], Case.prototype, "critical", void 0);
Case = __decorate([
    (0, typeorm_1.Entity)("case")
], Case);
exports.Case = Case;
//# sourceMappingURL=case.entity.js.map