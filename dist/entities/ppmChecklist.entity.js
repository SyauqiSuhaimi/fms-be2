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
exports.ppmChecklist = void 0;
const typeorm_1 = require("typeorm");
const ppm_entity_1 = require("./ppm.entity");
const company_entity_1 = require("./company.entity");
const user_entity_1 = require("../auth/user.entity");
const serviceContract_entity_1 = require("./serviceContract.entity");
const eq_type_entity_1 = require("./eq_type.entity");
let ppmChecklist = class ppmChecklist {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ppmChecklist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], ppmChecklist.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], ppmChecklist.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, width: 11, nullable: true }),
    __metadata("design:type", Number)
], ppmChecklist.prototype, "upload_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], ppmChecklist.prototype, "coordinate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], ppmChecklist.prototype, "referenceNo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.ppmchecklist, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], ppmChecklist.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ppm_entity_1.PPM, (ppm) => ppm.ppmchecklist, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], ppmChecklist.prototype, "ppm", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.ppmchecklist, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.User)
], ppmChecklist.prototype, "uploader", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => serviceContract_entity_1.ServiceContract, (serviceContract) => serviceContract.ppmchecklist, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Array)
], ppmChecklist.prototype, "serviceContract", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => eq_type_entity_1.Eq_Type, (eqtype) => eqtype.ppmchecklist, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", eq_type_entity_1.Eq_Type)
], ppmChecklist.prototype, "eqtype", void 0);
ppmChecklist = __decorate([
    (0, typeorm_1.Entity)("ppmchecklist")
], ppmChecklist);
exports.ppmChecklist = ppmChecklist;
//# sourceMappingURL=ppmChecklist.entity.js.map