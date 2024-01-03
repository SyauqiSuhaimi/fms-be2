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
exports.Subtask = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const tasktype_entity_1 = require("./tasktype.entity");
let Subtask = class Subtask {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Subtask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Subtask.prototype, "descripton", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.subtask, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", company_entity_1.Company)
], Subtask.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tasktype_entity_1.taskType, (tasktype) => tasktype.subtask, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinTable)({
        name: "subtask_tasktype",
        joinColumn: {
            referencedColumnName: "id",
            name: "subtaskId",
        },
        inverseJoinColumn: {
            referencedColumnName: "id",
            name: "tasktypeId",
        },
    }),
    __metadata("design:type", Array)
], Subtask.prototype, "tasktype", void 0);
Subtask = __decorate([
    (0, typeorm_1.Entity)("subtask")
], Subtask);
exports.Subtask = Subtask;
//# sourceMappingURL=subtask.entity.js.map