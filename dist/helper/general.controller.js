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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralController = void 0;
const common_1 = require("@nestjs/common");
const general_service_1 = require("./general.service");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let GeneralController = class GeneralController {
    constructor(service) {
        this.service = service;
    }
    async saveImage(body) {
        let imagePath = "/opt/bitnami/apache/htdocs/img/sign/";
        if (body["sign"] && body["sign"].length) {
            let filename = this.service.savebase64(imagePath, body["sign"]);
            if (filename) {
                return { success: true, message: "Signature Saved", data: { filename: filename } };
            }
            else {
                return { success: false, message: "Internal Error:Fail to save Signature", data: {} };
            }
        }
        else
            return { success: false, message: "No Signature given.", data: {} };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeneralController.prototype, "saveImage", null);
GeneralController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("general"),
    __metadata("design:paramtypes", [general_service_1.GeneralService])
], GeneralController);
exports.GeneralController = GeneralController;
//# sourceMappingURL=general.controller.js.map