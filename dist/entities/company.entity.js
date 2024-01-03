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
exports.Company = void 0;
const user_entity_1 = require("../auth/user.entity");
const usertype_entity_1 = require("../auth/usertype.entity");
const typeorm_1 = require("typeorm");
const area_entity_1 = require("./area.entity");
const caseType_entity_1 = require("./caseType.entity");
const case_status_entity_1 = require("./case_status.entity");
const department_entity_1 = require("./department.entity");
const equipment_entity_1 = require("./equipment.entity");
const eq_brand_entity_1 = require("./eq_brand.entity");
const eq_classification_entity_1 = require("./eq_classification.entity");
const eq_model_entity_1 = require("./eq_model.entity");
const eq_type_entity_1 = require("./eq_type.entity");
const groupCompany_entity_1 = require("./groupCompany.entity");
const groupList_entity_1 = require("./groupList.entity");
const holiday_entity_1 = require("./holiday.entity");
const news_entity_1 = require("./news.entity");
const serviceContract_entity_1 = require("./serviceContract.entity");
const workTrade_entity_1 = require("./workTrade.entity");
const ppmChecklist_entity_1 = require("./ppmChecklist.entity");
const inventory_entity_1 = require("./inventory.entity");
const rating_entity_1 = require("./rating.entity");
const mda_entity_1 = require("./mda.entity");
const category_entity_1 = require("./category.entity");
const asset_group_entity_1 = require("./asset_group.entity");
const subtask_entity_1 = require("./subtask.entity");
const tasktype_entity_1 = require("./tasktype.entity");
let Company = class Company {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Boolean)
], Company.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, default: "company_default.png" }),
    __metadata("design:type", String)
], Company.prototype, "image_file", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Boolean)
], Company.prototype, "government", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipment_entity_1.Equipment, (equipment) => equipment.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Company.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => department_entity_1.Department, (department) => department.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Company.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => groupCompany_entity_1.GroupCompany, (group) => group.company, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", groupCompany_entity_1.GroupCompany)
], Company.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => serviceContract_entity_1.ServiceContract, (serviceContract) => serviceContract.company, { onDelete: "SET NULL", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], Company.prototype, "servicecontract", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => area_entity_1.Area, (area) => area.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Company.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => caseType_entity_1.CaseType, (casetype) => casetype.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "casetype", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => groupList_entity_1.GroupList, (grouplist) => grouplist.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Company.prototype, "grouplist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workTrade_entity_1.WorkTrade, (worktrade) => worktrade.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Company.prototype, "worktrade", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => usertype_entity_1.userType, (usertype) => usertype.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Company.prototype, "usertype", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => holiday_entity_1.Holiday, (Holiday) => Holiday.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "holiday", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_status_entity_1.Case_Status, (case_status) => case_status.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "case_status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => news_entity_1.News, (news) => news.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => eq_type_entity_1.Eq_Type, (eq_type) => eq_type.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "eq_type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => eq_classification_entity_1.Eq_Classifications, (eq_classification) => eq_classification.company, { onDelete: "SET NULL", onUpdate: "CASCADE" }),
    __metadata("design:type", Array)
], Company.prototype, "eq_classification", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => eq_brand_entity_1.Eq_Brand, (eq_brand) => eq_brand.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "eq_brand", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => eq_model_entity_1.Eq_Model, (eq_model) => eq_model.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "eq_model", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ppmChecklist_entity_1.ppmChecklist, (ppmChecklist) => ppmChecklist.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "ppmchecklist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_entity_1.Inventory, (inventory) => inventory.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rating_entity_1.Rating, (rating) => rating.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mda_entity_1.mda, (mda) => mda.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Company.prototype, "mda", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.Category, (category) => category.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asset_group_entity_1.asset_group, (asset_group) => asset_group.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Company.prototype, "asset_group", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subtask_entity_1.Subtask, (subtask) => subtask.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Company.prototype, "subtask", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tasktype_entity_1.taskType, (tasktype) => tasktype.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", Array)
], Company.prototype, "tasktype", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Company.prototype, "ppmformname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 1 }),
    __metadata("design:type", Number)
], Company.prototype, "ppmformtype", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Company.prototype, "workordername", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 1 }),
    __metadata("design:type", Number)
], Company.prototype, "workordertype", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Company.prototype, "ppmmap", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Company.prototype, "workormap", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Company.prototype, "svg", void 0);
Company = __decorate([
    (0, typeorm_1.Entity)("company")
], Company);
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map