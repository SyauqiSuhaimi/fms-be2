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
exports.userType = void 0;
const company_entity_1 = require("../entities/company.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const userpermission_entity_1 = require("./userpermission.entity");
const groupList_entity_1 = require("../entities/groupList.entity");
let userType = class userType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], userType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], userType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], userType.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], userType.prototype, "useraccess", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.usertype, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], userType.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => user_entity_1.User, (user) => user.usertypes, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], userType.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => userpermission_entity_1.userPermission, (permission) => permission.usertypes, {
        cascade: ["insert", "update"],
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], userType.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => groupList_entity_1.GroupList, (grouplist) => grouplist.usertype, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", groupList_entity_1.GroupList)
], userType.prototype, "grouplist", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], userType.prototype, "mobile_access", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], userType.prototype, "web_access", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], userType.prototype, "view_mode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: "user" }),
    __metadata("design:type", String)
], userType.prototype, "type", void 0);
userType = __decorate([
    (0, typeorm_1.Entity)("type")
], userType);
exports.userType = userType;
//# sourceMappingURL=usertype.entity.js.map