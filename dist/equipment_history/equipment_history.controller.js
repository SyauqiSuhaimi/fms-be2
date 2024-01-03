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
exports.Equipment_HistoryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const equipment_history_service_1 = require("./equipment_history.service");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const equipment_history_entity_1 = require("../entities/equipment_history.entity");
const typeorm_1 = require("typeorm");
const general_service_1 = require("../helper/general.service");
let Equipment_HistoryController = class Equipment_HistoryController {
    constructor(equipment_historyService, jwtService, GeneralService) {
        this.equipment_historyService = equipment_historyService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.equipment_historyService.findAll({});
        return response;
    }
    async findOne(id) {
        const response = await this.equipment_historyService.findOne({
            where: { id: id },
            relations: [],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createEquipment_historyData) {
        const response = await this.equipment_historyService.create(createEquipment_historyData);
        return response;
    }
    async update(id, updateEquipment_historyData) {
        const response = await this.equipment_historyService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.equipment_historyService.update(id, updateEquipment_historyData);
            console.log(updateEquipment_historyData);
            return updateEquipment_historyData;
        }
    }
    async delete(id) {
        const response = await this.equipment_historyService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.equipment_historyService.remove(id);
            return response;
        }
    }
    async test2(cd) {
        const response = await this.equipment_historyService.findEquipment({
            where: cd,
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async history(request, startdate, enddate) {
        const cookie = request.cookies['jwt'];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const response = await this.equipment_historyService.findEquipment({
            where: {
                equipment: {
                    company: {
                        id: dataj['id'],
                    },
                },
                time: (0, typeorm_1.Between)(startdate, enddate),
            },
            relations: [
                "equipment",
                "Equipment_Status",
                "equipment.company",
                "equipment.department",
            ],
        });
        return response;
    }
    async historyeq(request, startdate, enddate) {
        const cookie = request.cookies['jwt'];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const response = await this.equipment_historyService.findEquipment({
            where: {
                time: (0, typeorm_1.Between)(startdate, enddate),
            },
            relations: [
                "equipment",
                "Equipment_Status",
                "equipment.department",
            ],
        });
        const report = [];
        response.forEach((entry) => {
            const departmentName = entry.equipment.department.name;
            const totalAssets = 1;
            let active = 0;
            let inactive = 0;
            let condemn = 0;
            const equipmentStatus = entry.Equipment_Status.eqstatus_name;
            if (equipmentStatus === "active") {
                active++;
            }
            else if (equipmentStatus === "inactive") {
                inactive++;
            }
            else if (equipmentStatus === "condemn") {
                condemn++;
            }
            report.push({
                Site: dataj.company.name,
                Department: departmentName,
                'Total Asset': totalAssets,
                Active: active,
                'In Active': inactive,
                Condemned: condemn,
            });
        });
        return report;
    }
    async history1(request, startdate, enddate) {
        const cookie = request.cookies['jwt'];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const response = await this.equipment_historyService.findEquipment({
            where: {
                time: (0, typeorm_1.Between)(startdate, enddate),
            },
            relations: [
                "equipment",
                "Equipment_Status",
                "equipment.department",
            ],
        });
        const report = [];
        const entriesByDepartment = new Map();
        response.forEach((entry) => {
            const departmentName = entry.equipment.department.name;
            if (!entriesByDepartment.has(departmentName)) {
                entriesByDepartment.set(departmentName, []);
            }
            entriesByDepartment.get(departmentName).push(entry);
        });
        entriesByDepartment.forEach((entries, departmentName) => {
            const departmentReport = {
                Site: dataj.company.name,
                Department: departmentName,
                'Total Asset': entries.length,
                Active: 0,
                'In Active': 0,
                Condemned: 0,
            };
            entries.forEach((entry) => {
                const equipmentStatus = entry.Equipment_Status.id;
                console.log(equipmentStatus);
                if (equipmentStatus === 1) {
                    departmentReport.Active++;
                }
                else if (equipmentStatus === 2) {
                    departmentReport['In Active']++;
                }
                else if (equipmentStatus === 3) {
                    departmentReport.Condemned++;
                }
            });
            report.push(departmentReport);
        });
        return report;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Equipment_HistoryController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Equipment_HistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [equipment_history_entity_1.Equipment_History]),
    __metadata("design:returntype", Promise)
], Equipment_HistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, equipment_history_entity_1.Equipment_History]),
    __metadata("design:returntype", Promise)
], Equipment_HistoryController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Equipment_HistoryController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("test"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Equipment_HistoryController.prototype, "test2", null);
__decorate([
    (0, common_1.Get)("history"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("startdate")),
    __param(2, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], Equipment_HistoryController.prototype, "history", null);
__decorate([
    (0, common_1.Get)("historyeq"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("startdate")),
    __param(2, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], Equipment_HistoryController.prototype, "historyeq", null);
__decorate([
    (0, common_1.Get)("history1"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("startdate")),
    __param(2, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], Equipment_HistoryController.prototype, "history1", null);
Equipment_HistoryController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("equipment_history"),
    __metadata("design:paramtypes", [equipment_history_service_1.Equipment_HistoryService,
        jwt_1.JwtService,
        general_service_1.GeneralService])
], Equipment_HistoryController);
exports.Equipment_HistoryController = Equipment_HistoryController;
//# sourceMappingURL=equipment_history.controller.js.map