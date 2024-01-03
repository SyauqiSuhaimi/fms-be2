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
exports.Maintenance = void 0;
const user_entity_1 = require("../auth/user.entity");
const typeorm_1 = require("typeorm");
const case_entity_1 = require("./case.entity");
let Maintenance = class Maintenance {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Maintenance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], Maintenance.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Maintenance.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Boolean)
], Maintenance.prototype, "ppm", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Maintenance.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Maintenance.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => case_entity_1.Case, (case2) => case2.maintenance, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "id" }),
    __metadata("design:type", case_entity_1.Case)
], Maintenance.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (users) => users.maintenance, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.User)
], Maintenance.prototype, "users", void 0);
Maintenance = __decorate([
    (0, typeorm_1.Entity)("maintenance")
], Maintenance);
exports.Maintenance = Maintenance;
//# sourceMappingURL=maintenance.entity.js.map