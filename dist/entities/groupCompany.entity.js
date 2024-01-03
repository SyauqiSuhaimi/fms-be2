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
exports.GroupCompany = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
let GroupCompany = class GroupCompany {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GroupCompany.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], GroupCompany.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Boolean)
], GroupCompany.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => company_entity_1.Company, (company) => company.group, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], GroupCompany.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], GroupCompany.prototype, "dashboardmap", void 0);
GroupCompany = __decorate([
    (0, typeorm_1.Entity)("group_company")
], GroupCompany);
exports.GroupCompany = GroupCompany;
//# sourceMappingURL=groupCompany.entity.js.map