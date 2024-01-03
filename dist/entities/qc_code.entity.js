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
exports.Qc_codeEntity = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("./case.entity");
let Qc_codeEntity = class Qc_codeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Qc_codeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Qc_codeEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Qc_codeEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_entity_1.Case, (cases) => cases.qc_code, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], Qc_codeEntity.prototype, "cases", void 0);
Qc_codeEntity = __decorate([
    (0, typeorm_1.Entity)('qc_code')
], Qc_codeEntity);
exports.Qc_codeEntity = Qc_codeEntity;
//# sourceMappingURL=qc_code.entity.js.map