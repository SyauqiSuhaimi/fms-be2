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
exports.Equipment = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("./case.entity");
const company_entity_1 = require("./company.entity");
const department_entity_1 = require("./department.entity");
const ppm_entity_1 = require("./ppm.entity");
const serviceContract_entity_1 = require("./serviceContract.entity");
const subArea_entity_1 = require("./subArea.entity");
const workTrade_entity_1 = require("./workTrade.entity");
const equipment_history_entity_1 = require("./equipment_history.entity");
const eq_type_entity_1 = require("./eq_type.entity");
const eq_model_entity_1 = require("./eq_model.entity");
const eq_classification_entity_1 = require("./eq_classification.entity");
const eq_brand_entity_1 = require("./eq_brand.entity");
const tempppm_entity_1 = require("./tempppm.entity");
const category_entity_1 = require("./category.entity");
const category_critical_entity_1 = require("./category_critical.entity");
const category_cost_entity_1 = require("./category_cost.entity");
const project_entity_1 = require("./project.entity");
const disposal_status_entity_1 = require("./disposal_status.entity");
const mda_entity_1 = require("./mda.entity");
const asset_status_entity_1 = require("./asset_status.entity");
const defect_entity_1 = require("./defect.entity");
const eq_matric_entity_1 = require("./eq_matric.entity");
const asset_group_entity_1 = require("./asset_group.entity");
const vo_status_entity_1 = require("./vo_status.entity");
const vendor_entity_1 = require("./vendor.entity");
const umdns_entity_1 = require("./umdns.entity");
const manufacture_entity_1 = require("./manufacture.entity");
let Equipment = class Equipment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Equipment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "serial_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "asset_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "sjsb_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => eq_type_entity_1.Eq_Type, (eq_type) => eq_type.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", eq_type_entity_1.Eq_Type)
], Equipment.prototype, "eq_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => eq_classification_entity_1.Eq_Classifications, (eq_classification) => eq_classification.equipment, { onDelete: "NO ACTION", onUpdate: "CASCADE" }),
    __metadata("design:type", eq_classification_entity_1.Eq_Classifications)
], Equipment.prototype, "eq_classification", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => eq_brand_entity_1.Eq_Brand, (eq_brand) => eq_brand.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", eq_brand_entity_1.Eq_Brand)
], Equipment.prototype, "eq_brand", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => eq_model_entity_1.Eq_Model, (eq_model) => eq_model.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", eq_model_entity_1.Eq_Model)
], Equipment.prototype, "eq_model", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "purchase_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "tc_Date", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 40, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "product_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "accessories", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "warranty", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "lifespan", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, default: "defaultequipment.jpg", nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "image_file", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "price_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    __metadata("design:type", Boolean)
], Equipment.prototype, "critical", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Equipment.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], Equipment.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.equipment, {
        nullable: true,
        eager: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", department_entity_1.Department)
], Equipment.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => serviceContract_entity_1.ServiceContract, (serviceContract) => serviceContract.equipment, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", Array)
], Equipment.prototype, "servicecontract", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (cases) => cases.equipment, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Equipment.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workTrade_entity_1.WorkTrade, (worktrade) => worktrade.equipment, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", workTrade_entity_1.WorkTrade)
], Equipment.prototype, "worktrade", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subArea_entity_1.SubArea, (subArea) => subArea.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", subArea_entity_1.SubArea)
], Equipment.prototype, "subarea", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ppm_entity_1.PPM, (ppm) => ppm.equipment, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Equipment.prototype, "ppm", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tempppm_entity_1.tempPpm, (tempPpm) => tempPpm.equipment, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Equipment.prototype, "tempPpm", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "asset_type_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "barcode_image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (Category) => Category.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        eager: true,
    }),
    __metadata("design:type", category_entity_1.Category)
], Equipment.prototype, "eq_category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_critical_entity_1.Category_critical, (category_critical) => category_critical.equipment, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", category_critical_entity_1.Category_critical)
], Equipment.prototype, "category_critical", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_cost_entity_1.Category_cost, (category_cost) => category_cost.equipment, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", category_cost_entity_1.Category_cost)
], Equipment.prototype, "category_cost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => manufacture_entity_1.manufacture, (manufacture) => manufacture.equipment, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", manufacture_entity_1.manufacture)
], Equipment.prototype, "manufacture", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "maker", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "registration_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "chassis_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "engine_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "engine_capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "fuel_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "current_meter_reading", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "manufacturing_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "software_version_key", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "power_specification", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "volt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => project_entity_1.project, (project) => project.equipment, {
        cascade: true,
        onDelete: "SET NULL",
    }),
    __metadata("design:type", project_entity_1.project)
], Equipment.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => disposal_status_entity_1.disposal_status, (disposal_status) => disposal_status.equipment, {
        cascade: true,
        onDelete: "SET NULL",
    }),
    __metadata("design:type", disposal_status_entity_1.disposal_status)
], Equipment.prototype, "disposal_status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => mda_entity_1.mda, (mda) => mda.equipment, {
        cascade: true,
        onDelete: "SET NULL",
    }),
    __metadata("design:type", mda_entity_1.mda)
], Equipment.prototype, "mda", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => asset_status_entity_1.Asset_Status, (asset_status) => asset_status.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", asset_status_entity_1.Asset_Status)
], Equipment.prototype, "asset_status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => defect_entity_1.defect, (defect) => defect.equipment, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Equipment.prototype, "defect", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Boolean)
], Equipment.prototype, "routine", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Boolean)
], Equipment.prototype, "calibration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "maintenance_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Boolean)
], Equipment.prototype, "nominated_contractor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "last_work_order_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "last_service_work_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "last_work_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "last_service_date", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => eq_matric_entity_1.eq_matric, (eq_matric) => eq_matric.equipment, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Equipment.prototype, "eq_matric", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "warranty_start", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "warranty_end", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "year_service", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "commision_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => asset_group_entity_1.asset_group, (asset_group) => asset_group.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", asset_group_entity_1.asset_group)
], Equipment.prototype, "asset_group", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipment_history_entity_1.Equipment_History, (equipment_history) => equipment_history.equipment, { onDelete: "SET NULL", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], Equipment.prototype, "equipment_history", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => equipment_history_entity_1.Equipment_History, (equipment_history) => equipment_history.equipmenthistorystatus, {
        nullable: true,
        eager: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", equipment_history_entity_1.Equipment_History)
], Equipment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vo_status_entity_1.vo_status, (vo_status) => vo_status.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", vo_status_entity_1.vo_status)
], Equipment.prototype, "vo_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "effective_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Equipment.prototype, "service_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "spata_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "spata_desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "specification", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "power_specification_watt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "power_specification_ampere", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "vo_remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "purchase_category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor, (main_supplier) => main_supplier.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", vendor_entity_1.Vendor)
], Equipment.prototype, "main_supplier", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => umdns_entity_1.umdns, (umdns) => umdns.equipment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        eager: true,
    }),
    __metadata("design:type", umdns_entity_1.umdns)
], Equipment.prototype, "umdns", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "jkpp_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Equipment.prototype, "resourse_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], Equipment.prototype, "maintanance_work", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Equipment.prototype, "labour_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Equipment.prototype, "vendor_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Equipment.prototype, "material_cost", void 0);
Equipment = __decorate([
    (0, typeorm_1.Entity)("equipment")
], Equipment);
exports.Equipment = Equipment;
//# sourceMappingURL=equipment.entity.js.map