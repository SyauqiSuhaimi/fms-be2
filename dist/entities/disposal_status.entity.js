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
exports.disposal_status = void 0;
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("./equipment.entity");
let disposal_status = class disposal_status {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], disposal_status.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], disposal_status.prototype, "disposal_approve_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ width: 11, nullable: true, default: null }),
    __metadata("design:type", Number)
], disposal_status.prototype, "disposal_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], disposal_status.prototype, "disposed_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], disposal_status.prototype, "disposed_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, default: null }),
    __metadata("design:type", String)
], disposal_status.prototype, "disposal_sign", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => equipment_entity_1.Equipment, (equipment) => equipment.disposal_status, {
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", equipment_entity_1.Equipment)
], disposal_status.prototype, "equipment", void 0);
disposal_status = __decorate([
    (0, typeorm_1.Entity)("disposal_status")
], disposal_status);
exports.disposal_status = disposal_status;
//# sourceMappingURL=disposal_status.entity.js.map