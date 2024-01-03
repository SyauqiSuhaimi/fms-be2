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
exports.Qc_codeController = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("@nestjsx/crud");
const qc_code_service_1 = require("./qc_code.service");
const qc_code_entity_1 = require("../entities/qc_code.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let Qc_codeController = class Qc_codeController {
    constructor(service) {
        this.service = service;
    }
};
Qc_codeController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, crud_1.Crud)({
        model: { type: qc_code_entity_1.Qc_codeEntity },
        params: {},
    }),
    (0, common_1.Controller)("rest/qc_code"),
    __metadata("design:paramtypes", [qc_code_service_1.Qc_codeService])
], Qc_codeController);
exports.Qc_codeController = Qc_codeController;
//# sourceMappingURL=qc_code.controller.js.map