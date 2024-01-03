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
exports.User = void 0;
const case_entity_1 = require("../entities/case.entity");
const caseHistory_entity_1 = require("../entities/caseHistory.entity");
const company_entity_1 = require("../entities/company.entity");
const department_entity_1 = require("../entities/department.entity");
const groupList_entity_1 = require("../entities/groupList.entity");
const maintenance_entity_1 = require("../entities/maintenance.entity");
const technician_entity_1 = require("../entities/technician.entity");
const workTrade_entity_1 = require("../entities/workTrade.entity");
const typeorm_1 = require("typeorm");
const usertype_entity_1 = require("./usertype.entity");
const news_entity_1 = require("../entities/news.entity");
const ppmChecklist_entity_1 = require("../entities/ppmChecklist.entity");
const tempppm_entity_1 = require("../entities/tempppm.entity");
const notification_entity_1 = require("../entities/notification.entity");
const workspace_entity_1 = require("../entities/workspace.entity");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "ot1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "ot2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "ot3", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, default: "usericon.png" }),
    __metadata("design:type", String)
], User.prototype, "image_file", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "mobile_no", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => usertype_entity_1.userType, (type) => type.users, {
        onDelete: "SET NULL",
        nullable: true,
    }),
    __metadata("design:type", usertype_entity_1.userType)
], User.prototype, "usertypes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.users, {
        nullable: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", department_entity_1.Department)
], User.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => maintenance_entity_1.Maintenance, (maintenance) => maintenance.users, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "maintenance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => groupList_entity_1.GroupList, (grouplist) => grouplist.users, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", String)
], User.prototype, "grouplist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.user, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], User.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (cases) => cases.requestor, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => technician_entity_1.Technician, (CaseMaintained) => CaseMaintained.maintainer, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "casemaintained", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => technician_entity_1.Technician, (CaseAssigned) => CaseAssigned.assigner, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "caseassigned", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => workTrade_entity_1.WorkTrade, (worktrade) => worktrade.users, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinTable)({
        name: "usercategory",
        joinColumn: {
            referencedColumnName: "id",
            name: "user_id",
        },
        inverseJoinColumn: {
            referencedColumnName: "id",
            name: "category_id",
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "worktrade", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => caseHistory_entity_1.CaseHistory, (caseHistory) => caseHistory.updater, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "casehistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => caseHistory_entity_1.CaseHistory, (caseHistory) => caseHistory.user, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "user_casehistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => news_entity_1.News, (news) => news.publisher, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ppmChecklist_entity_1.ppmChecklist, (ppmChecklist) => ppmChecklist.uploader, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "ppmchecklist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tempppm_entity_1.tempPpm, (tempPpm) => tempPpm.requestor, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "tempPpm", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notifications, (notifications) => notifications.user, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", notification_entity_1.Notifications)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workspace_entity_1.workspace, (workspace) => workspace.user, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "workspace", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "user_work_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "user_unit", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map