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
exports.GroupMain = void 0;
const typeorm_1 = require("typeorm");
const workTrade_entity_1 = require("./workTrade.entity");
const eq_type_entity_1 = require("./eq_type.entity");
let GroupMain = class GroupMain {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GroupMain.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], GroupMain.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workTrade_entity_1.WorkTrade, (worktrade) => worktrade, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", workTrade_entity_1.WorkTrade)
], GroupMain.prototype, "worktrade", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => eq_type_entity_1.Eq_Type, (eqtype) => eqtype.groupmain, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], GroupMain.prototype, "eqtype", void 0);
GroupMain = __decorate([
    (0, typeorm_1.Entity)("groupmain")
], GroupMain);
exports.GroupMain = GroupMain;
//# sourceMappingURL=groupMain.entity.js.map