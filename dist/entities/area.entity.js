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
exports.Area = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const department_entity_1 = require("./department.entity");
const subArea_entity_1 = require("./subArea.entity");
let Area = class Area {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Area.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Area.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Area.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Area.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.area, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], Area.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.area, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", department_entity_1.Department)
], Area.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subArea_entity_1.SubArea, (subarea) => subarea.area, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        cascade: true,
        nullable: true,
    }),
    __metadata("design:type", Array)
], Area.prototype, "subarea", void 0);
Area = __decorate([
    (0, typeorm_1.Entity)("area")
], Area);
exports.Area = Area;
//# sourceMappingURL=area.entity.js.map