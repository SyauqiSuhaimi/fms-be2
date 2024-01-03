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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("./equipment.entity");
const company_entity_1 = require("./company.entity");
let Category = class Category {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipment_entity_1.Equipment, (equipment) => equipment.eq_category, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", equipment_entity_1.Equipment)
], Category.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.category, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], Category.prototype, "company", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)("category")
], Category);
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map