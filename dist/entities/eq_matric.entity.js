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
exports.eq_matric = void 0;
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("./equipment.entity");
let eq_matric = class eq_matric {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], eq_matric.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], eq_matric.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment, (equipment) => equipment.eq_matric, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", equipment_entity_1.Equipment)
], eq_matric.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", String)
], eq_matric.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", String)
], eq_matric.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: true, }),
    __metadata("design:type", String)
], eq_matric.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Boolean)
], eq_matric.prototype, "append", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], eq_matric.prototype, "last_update", void 0);
eq_matric = __decorate([
    (0, typeorm_1.Entity)("eq_matric")
], eq_matric);
exports.eq_matric = eq_matric;
//# sourceMappingURL=eq_matric.entity.js.map