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
exports.CaseHistoryController = void 0;
const common_1 = require("@nestjs/common");
const Case_History_service_1 = require("./Case_History.service");
const caseHistory_entity_1 = require("../entities/caseHistory.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const case_service_1 = require("../case/case.service");
const auth_service_1 = require("../auth/auth.service");
const notification_service_1 = require("../notification/notification.service");
const cases_gateway_1 = require("../GatewayHandler/cases.gateway");
const equipment_service_1 = require("../equipment/equipment.service");
const case_status_service_1 = require("../Case_Status/case_status.service");
const helper_1 = require("../helper/helper");
const inventory_usage_service_1 = require("../inventory_usage/inventory_usage.service");
const equipment_history_service_1 = require("../equipment_history/equipment_history.service");
const equipment_status_service_1 = require("../eq_status/equipment_status.service");
const general_service_1 = require("../helper/general.service");
const destinationPath = "/opt/bitnami/apache/htdocs/img/report";
const storage = helper_1.default.functions.createMulterStorage(destinationPath);
let CaseHistoryController = class CaseHistoryController {
    constructor(caseHistoryService, caseService, AuthService, notificationsService, casegateway, equipmentService, Case_StatusService, Inventory_UsageService, Equipment_HistoryService, equipment_statusService, GeneralService) {
        this.caseHistoryService = caseHistoryService;
        this.caseService = caseService;
        this.AuthService = AuthService;
        this.notificationsService = notificationsService;
        this.casegateway = casegateway;
        this.equipmentService = equipmentService;
        this.Case_StatusService = Case_StatusService;
        this.Inventory_UsageService = Inventory_UsageService;
        this.Equipment_HistoryService = Equipment_HistoryService;
        this.equipment_statusService = equipment_statusService;
        this.GeneralService = GeneralService;
    }
    async fillAll() {
        const response = await this.caseHistoryService.findAll();
        return response;
    }
    async findOne(id) {
        const response = await this.caseHistoryService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(file, createcaseHistoryeData) {
        console.log("try history", file);
        console.log(createcaseHistoryeData);
        const response = await this.caseHistoryService.create(createcaseHistoryeData);
        console.log(response);
        return response;
    }
    async update(id, updatecaseHistoryData) {
        const response = await this.caseHistoryService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.caseHistoryService.update(id, updatecaseHistoryData);
            return updatecaseHistoryData;
        }
    }
    async delete(id) {
        const response = await this.caseHistoryService.findOne({
            where: { id: id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.caseHistoryService.remove(id);
            return response;
        }
    }
    async createcase(body, files) {
        console.log("body", body);
        let casehistoryinfo = body["form"];
        let caseinfo = body["case"];
        let inventoryList = body["form"]["inventory"];
        if (casehistoryinfo.cases.fromsubarea ||
            casehistoryinfo.cases.fromsubarea == "") {
            casehistoryinfo.cases.fromsubarea = null;
        }
        if (casehistoryinfo.cases.tosubarea ||
            casehistoryinfo.cases.tosubarea == "") {
            casehistoryinfo.cases.tosubarea = null;
        }
        if (casehistoryinfo.cases.location ||
            casehistoryinfo.cases.location == "") {
            casehistoryinfo.cases.location = null;
        }
        let oldstatus = casehistoryinfo["cases"]["case_status"];
        casehistoryinfo["old_status"] =
            casehistoryinfo["cases"]["case_status"]["id"];
        casehistoryinfo["new_status"] = caseinfo["case_status"];
        delete casehistoryinfo.casetype;
        if (casehistoryinfo["user_sign"]) {
            let imagePath = `/opt/bitnami/apache/htdocs/img/sign/`;
            casehistoryinfo["user_sign"] = this.GeneralService.savebase64(imagePath, casehistoryinfo["user_sign"]);
            console.log("user sign", casehistoryinfo["user_sign"]);
        }
        if (casehistoryinfo["technician_sign"]) {
            let imagePath2 = `/opt/bitnami/apache/htdocs/img/sign/`;
            casehistoryinfo["technician_sign"] = this.GeneralService.savebase64(imagePath2, casehistoryinfo["technician_sign"]);
            console.log("tech sign", casehistoryinfo["technician_sign"]);
        }
        if (files) {
            const n = files.length;
            const arr = [];
            casehistoryinfo.image_file = "";
            if (n >= 1) {
                for (let i = 0; i < n; i++) {
                    arr.push(files[i].filename);
                }
                casehistoryinfo.image_file = arr.toString();
            }
        }
        const id = casehistoryinfo.cases.id;
        const caseHistory = await this.caseHistoryService.create(casehistoryinfo);
        delete casehistoryinfo.cases.casehistory;
        delete casehistoryinfo.cases.worktrade;
        let responses = {};
        responses["history"] = caseHistory;
        responses["cases"] = {};
        let case_id = caseinfo["id"];
        let case_updateCaseData = caseinfo["data"];
        let case_status = caseinfo["case_status"];
        let equipment = caseinfo["equipment"];
        const response = await this.caseService.findOne({ where: { id: case_id } });
        delete case_updateCaseData.technician;
        const response2 = await this.Case_StatusService.findOne({
            where: { id: case_status },
        });
        case_updateCaseData["case_status"] = { ...response2 };
        caseHistory["cases"]["case_status"] = { ...response2 };
        let notificationdata = {
            name: "caseshistory",
            cases: caseHistory["cases"],
            casehistory: caseHistory,
            oldstatus: oldstatus,
            newstatus: { ...response2 },
        };
        console.log("caseinfo.requestor", casehistoryinfo.cases.requestor);
        const userRecord = await this.AuthService.findAll({
            where: {
                usertypes: { type: "admin" },
                company: { id: casehistoryinfo.cases.requestor.company.id },
            },
        });
        for (let i = 0; i < userRecord.length; i++) {
            if (userRecord[i].password) {
                delete userRecord[i].password;
            }
        }
        if (userRecord) {
            if ([1, 3, 4, 5, 6, 8, 9].includes(casehistoryinfo.cases.case_status.id)) {
                for (let i = 0; i < userRecord.length; i++) {
                    notificationdata["user"] = userRecord[i];
                    console.log("noti data", userRecord[i]);
                    await this.notificationsService.create(notificationdata);
                    this.casegateway.newnotify(userRecord[i].email, notificationdata);
                }
            }
        }
        const technicianRecords = casehistoryinfo.cases.technician;
        if (technicianRecords && technicianRecords.length) {
            const userIds = technicianRecords.map((TechRec) => ({
                id: TechRec.maintainer.id,
                email: TechRec.maintainer.email,
            }));
            userIds.forEach(async (user) => {
                notificationdata["user"] = user;
                let tempdata = await this.notificationsService.create(notificationdata);
                this.casegateway.newnotify(user.email, notificationdata);
            });
        }
        delete casehistoryinfo.cases.technician;
        if (!response) {
            throw new common_1.BadRequestException("No case  Data");
        }
        else {
            if (case_updateCaseData.case_status.id == 1) {
                const { cost, vendor_cost, material_cost, labour_cost } = await this.caseHistoryService.getCostsForCase(case_id);
                if (equipment) {
                    equipment.cost = parseFloat(equipment.cost.cost) + cost;
                    const eq_history = {
                        id: 0,
                        eqhistory_name: "Equipment Repaired",
                        time: Math.floor(Date.now() / 1000),
                        Equipment_Status: await this.equipment_statusService.findOne({
                            where: { id: 1 },
                        }),
                        equipment: equipment,
                        equipmenthistorystatus: equipment,
                    };
                    equipment.status = await this.Equipment_HistoryService.create(eq_history);
                    await this.equipmentService.update2(equipment.id, equipment);
                }
                case_updateCaseData.cost = cost;
                case_updateCaseData.vendor_cost = vendor_cost;
                case_updateCaseData.material_cost = material_cost;
                case_updateCaseData.labour_cost = labour_cost;
                case_updateCaseData.end_date = Math.floor(Date.now() / 1000);
            }
            if (case_updateCaseData.case_status.id == 4) {
                case_updateCaseData.inspected_time = Math.floor(Date.now() / 1000);
                if (equipment) {
                    const eq_history = {
                        id: 0,
                        eqhistory_name: "Equipment Inspected",
                        time: Math.floor(Date.now() / 1000),
                        Equipment_Status: await this.equipment_statusService.findOne({
                            where: { id: 4 },
                        }),
                        equipment: equipment,
                        equipmenthistorystatus: equipment,
                    };
                    equipment.status = await this.Equipment_HistoryService.create(eq_history);
                    console.log("masuk");
                    await this.equipmentService.update2(equipment.id, equipment);
                    console.log("masuk2");
                }
            }
            if (case_updateCaseData.case_status.id == 5) {
                case_updateCaseData.on_action_time = Math.floor(Date.now() / 1000);
                const currentCase = await this.caseService.findOne({
                    where: { id: case_updateCaseData.id },
                });
                if (currentCase.pause_time > 0) {
                    case_updateCaseData.pause_duration =
                        Math.floor(Date.now() / 1000) -
                            currentCase.pause_time +
                            Number(currentCase.pause_duration);
                }
                if (equipment) {
                    const eq_history = {
                        id: 0,
                        eqhistory_name: "Equipment Repairing",
                        time: Math.floor(Date.now() / 1000),
                        Equipment_Status: await this.equipment_statusService.findOne({
                            where: { id: 4 },
                        }),
                        equipment: equipment,
                        equipmenthistorystatus: equipment,
                    };
                    equipment.status = await this.Equipment_HistoryService.create(eq_history);
                    await this.equipmentService.update2(equipment.id, equipment);
                }
            }
            if (case_updateCaseData.case_status.id == 6) {
                case_updateCaseData.action_done_time = Math.floor(Date.now() / 1000);
            }
            if (case_updateCaseData.case_status.id == 8) {
                case_updateCaseData.pause_time = Math.floor(Date.now() / 1000);
            }
            case_updateCaseData["effectiveServicecontract"] =
                casehistoryinfo["effectiveServicecontract"];
            await this.caseService.update(case_id, case_updateCaseData);
            if (equipment) {
                await this.equipmentService.update2(equipment.id, equipment);
            }
            responses["cases"] = case_updateCaseData;
            if (inventoryList) {
                console.log("intventoryList", inventoryList);
                inventoryList.forEach(async (inventory) => {
                    let usage_history = {
                        id: 0,
                        count: inventory.quantity,
                        inventory: inventory,
                        cases: case_id,
                        inventorypricehistory: inventory.effectivePrice,
                        casehistory: casehistoryinfo,
                        datetime: casehistoryinfo.datetime,
                    };
                    await this.Inventory_UsageService.create(usage_history);
                });
            }
        }
        return responses;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaseHistoryController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CaseHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("image_file[]", 10, { storage: storage })),
    __param(0, (0, common_1.UploadedFile)("image_file[]")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], CaseHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, caseHistory_entity_1.CaseHistory]),
    __metadata("design:returntype", Promise)
], CaseHistoryController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CaseHistoryController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("casereport/create"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("image_file[]", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], CaseHistoryController.prototype, "createcase", null);
CaseHistoryController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("casehistory"),
    __metadata("design:paramtypes", [Case_History_service_1.CaseHistoryService,
        case_service_1.CaseService,
        auth_service_1.AuthService,
        notification_service_1.NotificationsService,
        cases_gateway_1.CasesGateway,
        equipment_service_1.EquipmentService,
        case_status_service_1.Case_StatusService,
        inventory_usage_service_1.Inventory_UsageService,
        equipment_history_service_1.Equipment_HistoryService,
        equipment_status_service_1.equipment_statusService,
        general_service_1.GeneralService])
], CaseHistoryController);
exports.CaseHistoryController = CaseHistoryController;
//# sourceMappingURL=Case_History.controller.js.map