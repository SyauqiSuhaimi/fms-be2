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
exports.userPermission = void 0;
const typeorm_1 = require("typeorm");
const feature_entity_1 = require("./feature.entity");
const usertype_entity_1 = require("./usertype.entity");
let userPermission = class userPermission {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], userPermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Number)
], userPermission.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => usertype_entity_1.userType, (type) => type.permissions, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", usertype_entity_1.userType)
], userPermission.prototype, "usertypes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => feature_entity_1.Feature, (feature) => feature.permissions, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", feature_entity_1.Feature)
], userPermission.prototype, "features", void 0);
userPermission = __decorate([
    (0, typeorm_1.Entity)("userpermission"),
    (0, typeorm_1.Unique)(["usertypes", "features"])
], userPermission);
exports.userPermission = userPermission;
//# sourceMappingURL=userpermission.entity.js.map