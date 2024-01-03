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
exports.Notifications = void 0;
const user_entity_1 = require("../auth/user.entity");
const typeorm_1 = require("typeorm");
const case_entity_1 = require("./case.entity");
const caseHistory_entity_1 = require("./caseHistory.entity");
const news_entity_1 = require("./news.entity");
let Notifications = class Notifications {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notifications.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Notifications.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (cases) => cases.notifications, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", case_entity_1.Case)
], Notifications.prototype, "cases", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => caseHistory_entity_1.CaseHistory, (CaseHistory) => CaseHistory.notifications, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", caseHistory_entity_1.CaseHistory)
], Notifications.prototype, "casehistory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => news_entity_1.News, (News) => News.notifications, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", news_entity_1.News)
], Notifications.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.notifications, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Notifications.prototype, "user", void 0);
Notifications = __decorate([
    (0, typeorm_1.Entity)("notifications")
], Notifications);
exports.Notifications = Notifications;
//# sourceMappingURL=notification.entity.js.map