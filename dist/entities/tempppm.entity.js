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
exports.tempPpm = void 0;
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("./equipment.entity");
const workTrade_entity_1 = require("./workTrade.entity");
const user_entity_1 = require("../auth/user.entity");
const subArea_entity_1 = require("./subArea.entity");
const ppm_entity_1 = require("./ppm.entity");
let tempPpm = class tempPpm {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], tempPpm.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], tempPpm.prototype, "request_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (requestor) => requestor.tempPpm, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.User)
], tempPpm.prototype, "requestor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], tempPpm.prototype, "contact_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], tempPpm.prototype, "mobile_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], tempPpm.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], tempPpm.prototype, "expected_day_taken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true, default: null }),
    __metadata("design:type", Number)
], tempPpm.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment, (equipment) => equipment.tempPpm, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", equipment_entity_1.Equipment)
], tempPpm.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workTrade_entity_1.WorkTrade, (worktrade) => worktrade.tempPpm, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", workTrade_entity_1.WorkTrade)
], tempPpm.prototype, "worktrade", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ppm_entity_1.PPM, (ppm) => ppm.tempPpm, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", ppm_entity_1.PPM)
], tempPpm.prototype, "ppm", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subArea_entity_1.SubArea, (subarea) => subarea.nomad_cases, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", subArea_entity_1.SubArea)
], tempPpm.prototype, "location", void 0);
tempPpm = __decorate([
    (0, typeorm_1.Entity)("tempppm")
], tempPpm);
exports.tempPpm = tempPpm;
//# sourceMappingURL=tempppm.entity.js.map