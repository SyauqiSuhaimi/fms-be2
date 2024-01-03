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
exports.WorkTrade = void 0;
const eq_type_entity_1 = require("../entities/eq_type.entity");
const user_entity_1 = require("../auth/user.entity");
const typeorm_1 = require("typeorm");
const case_entity_1 = require("./case.entity");
const company_entity_1 = require("./company.entity");
const equipment_entity_1 = require("./equipment.entity");
const groupList_entity_1 = require("./groupList.entity");
const tempppm_entity_1 = require("./tempppm.entity");
const groupMain_entity_1 = require("./groupMain.entity");
let WorkTrade = class WorkTrade {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkTrade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], WorkTrade.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.worktrade, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], WorkTrade.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (cases) => cases.worktrade, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], WorkTrade.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipment_entity_1.Equipment, (equipment) => equipment.worktrade, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], WorkTrade.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => eq_type_entity_1.Eq_Type, (eq_type) => eq_type.worktrade, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", eq_type_entity_1.Eq_Type)
], WorkTrade.prototype, "eq_type", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (users) => users.worktrade, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", Array)
], WorkTrade.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => groupList_entity_1.GroupList, (grouplist) => grouplist.worktradelist, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", Array)
], WorkTrade.prototype, "grouplist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tempppm_entity_1.tempPpm, (tempPpm) => tempPpm.worktrade, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], WorkTrade.prototype, "tempPpm", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => groupMain_entity_1.GroupMain, (groupmain) => groupmain.worktrade, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], WorkTrade.prototype, "groupmain", void 0);
WorkTrade = __decorate([
    (0, typeorm_1.Entity)("worktrade")
], WorkTrade);
exports.WorkTrade = WorkTrade;
//# sourceMappingURL=workTrade.entity.js.map