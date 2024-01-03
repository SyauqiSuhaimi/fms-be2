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
exports.PanelType = void 0;
const typeorm_1 = require("typeorm");
const panel_entity_1 = require("./panel.entity");
let PanelType = class PanelType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PanelType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], PanelType.prototype, "category1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], PanelType.prototype, "category2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], PanelType.prototype, "category3", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], PanelType.prototype, "category4", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], PanelType.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], PanelType.prototype, "userAccess", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], PanelType.prototype, "enable", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], PanelType.prototype, "disable", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => panel_entity_1.Panel, panel => panel.paneltype, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        nullable: true,
    }),
    __metadata("design:type", panel_entity_1.Panel)
], PanelType.prototype, "panel", void 0);
PanelType = __decorate([
    (0, typeorm_1.Entity)({ name: 'paneltype' })
], PanelType);
exports.PanelType = PanelType;
//# sourceMappingURL=paneltype.entity.js.map