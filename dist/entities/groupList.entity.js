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
exports.GroupList = void 0;
const user_entity_1 = require("../auth/user.entity");
const typeorm_1 = require("typeorm");
const workTrade_entity_1 = require("./workTrade.entity");
const company_entity_1 = require("./company.entity");
const usertype_entity_1 = require("../auth/usertype.entity");
let GroupList = class GroupList {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GroupList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], GroupList.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.grouplist, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], GroupList.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (users) => users.grouplist, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], GroupList.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => workTrade_entity_1.WorkTrade, (worktradelist) => worktradelist.grouplist, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinTable)({
        name: "group_category",
        joinColumn: {
            referencedColumnName: "id",
            name: "group_id",
        },
        inverseJoinColumn: {
            referencedColumnName: "id",
            name: "category_id",
        },
    }),
    __metadata("design:type", Array)
], GroupList.prototype, "worktradelist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => usertype_entity_1.userType, (usertype) => usertype.company, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], GroupList.prototype, "usertype", void 0);
GroupList = __decorate([
    (0, typeorm_1.Entity)("grouplist")
], GroupList);
exports.GroupList = GroupList;
//# sourceMappingURL=groupList.entity.js.map