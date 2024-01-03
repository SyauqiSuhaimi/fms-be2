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
exports.workspace = void 0;
const typeorm_1 = require("typeorm");
const paneltype_entity_1 = require("./paneltype.entity");
const user_entity_1 = require("../auth/user.entity");
const panel_entity_1 = require("./panel.entity");
let workspace = class workspace {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], workspace.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], workspace.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.workspace, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], workspace.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => panel_entity_1.Panel, panel => panel.workspace, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", panel_entity_1.Panel)
], workspace.prototype, "panel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], workspace.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paneltype_entity_1.PanelType, paneltype => paneltype.panel, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", paneltype_entity_1.PanelType)
], workspace.prototype, "paneltype", void 0);
workspace = __decorate([
    (0, typeorm_1.Entity)('workspace')
], workspace);
exports.workspace = workspace;
//# sourceMappingURL=workspace.entity.js.map