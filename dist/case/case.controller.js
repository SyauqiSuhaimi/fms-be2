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
exports.CaseController = void 0;
const general_service_1 = require("../helper/general.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const case_service_1 = require("./case.service");
const case_entity_1 = require("../entities/case.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const typeorm_1 = require("typeorm");
const equipment_service_1 = require("../equipment/equipment.service");
const case_status_service_1 = require("../Case_Status/case_status.service");
const auth_service_1 = require("../auth/auth.service");
const Case_History_service_1 = require("../Case_History/Case_History.service");
const group_list_service_1 = require("../Group_list/group_list.service");
const Area_service_1 = require("../Area/Area.service");
const notification_service_1 = require("../notification/notification.service");
const cases_gateway_1 = require("../GatewayHandler/cases.gateway");
const department_service_1 = require("../department/department.service");
const Sub_Area_service_1 = require("../Sub_Area/Sub_Area.service");
const helper_1 = require("../helper/helper");
const Case_Type_service_1 = require("../Case_Type/Case_Type.service");
const asset_status_service_1 = require("../asset_status/asset_status.service");
const qc_service_1 = require("../qc/qc.service");
const inventory_usage_service_1 = require("../inventory_usage/inventory_usage.service");
const destinationPath = "/opt/bitnami/apache/htdocs/img/report";
const storage = helper_1.default.functions.createMulterStorage(destinationPath);
let CaseController = class CaseController {
    constructor(caseService, equipmentService, jwtService, Case_StatusService, AuthService, caseHistoryService, GeneralService, GroupListService, AreaService, notificationsService, departmentService, subAreaService, casegateway, casetypeService, asset_statusService, qcservice, case_statusService, Inventory_UsageService) {
        this.caseService = caseService;
        this.equipmentService = equipmentService;
        this.jwtService = jwtService;
        this.Case_StatusService = Case_StatusService;
        this.AuthService = AuthService;
        this.caseHistoryService = caseHistoryService;
        this.GeneralService = GeneralService;
        this.GroupListService = GroupListService;
        this.AreaService = AreaService;
        this.notificationsService = notificationsService;
        this.departmentService = departmentService;
        this.subAreaService = subAreaService;
        this.casegateway = casegateway;
        this.casetypeService = casetypeService;
        this.asset_statusService = asset_statusService;
        this.qcservice = qcservice;
        this.case_statusService = case_statusService;
        this.Inventory_UsageService = Inventory_UsageService;
    }
    async findAll(request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.caseService.findCase({
            where: { equipment: { company: { user: { id: data["id"] } } } },
            relations: [
                "equipment.department",
                "equipment.subarea",
                "equipment.eq_type",
                "equipment.eq_classification",
                "equipment.eq_brand",
                "equipment.eq_model",
            ],
        });
        return response;
    }
    async data(request) {
        const response = await this.caseService.getdata();
        return response;
    }
    async findOne(id) {
        const response = await this.caseService.findOne({
            where: { id: id },
            relations: [
                "equipment.cases",
                "casetype",
                "casehistory",
                "worktrade",
                "fromsubarea",
                "tosubarea",
                "technician.maintainer",
                "technician.assigner",
                "technician.cases",
                "case_status",
                "equipment.eq_type",
                "equipment.eq_classification",
                "equipment.eq_brand",
                "equipment.eq_model",
                "location.area.department",
            ],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async byRange(startRange, endRange, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.caseService.findCase({
            where: {
                equipment: { company: { user: { id: data["id"] } } },
                request_date: (0, typeorm_1.Between)(startRange, endRange),
            },
            relations: ["equipment"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async worktradeAll(bodyData, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let response = null;
        let rules = {};
        rules["casetype"] = { name: (0, typeorm_1.Not)("PPM") };
        if (bodyData["status"])
            rules["case_status"] = { id: (0, typeorm_1.In)(bodyData["status"]) };
        if (data["id"]) {
            rules["requestor"] = { company: { user: { id: data["id"] } } };
        }
        if (data["usertype"] == "user") {
            rules["requestor"] = { id: data["id"] };
        }
        if (data["usertype"] == "technician") {
            rules["worktrade"] = { users: { id: data["id"] } };
            rules["technician"] = { maintainer: { id: data["id"] } };
        }
        if (bodyData["endRange"] && bodyData["endRange"] != 0) {
            rules["request_date"] = (0, typeorm_1.Between)(bodyData["startRange"], bodyData["endRange"]);
        }
        if (bodyData["group"]) {
            if (bodyData["worktrade"]) {
                rules["worktrade"] = { id: bodyData["worktrade"]["id"] };
            }
            else {
                rules["worktrade"] = { grouplist: { id: bodyData["group"]["id"] } };
            }
        }
        if (bodyData["department"]) {
            if (bodyData["area"]) {
                if (bodyData["subarea"]) {
                    rules["location"] = { id: bodyData["location"]["id"] };
                }
                else {
                    rules["location"] = { area: { id: bodyData["area"]["id"] } };
                }
            }
            else {
                rules["location"] = {
                    area: { department: { id: bodyData["department"]["id"] } },
                };
            }
        }
        let arr2 = [];
        let relations = [
            "equipment",
            "case_status",
            "equipment.subarea",
            "casetype",
            "equipment.eq_type",
            "equipment.eq_classification",
            "equipment.eq_brand",
            "equipment.eq_model",
            "location.area.department",
            "worktrade.grouplist",
            "qc",
        ];
        if (bodyData["history"]) {
            relations.push("casehistory.user");
            relations.push("casehistory.updater");
        }
        if (data["usertype"] == "technician") {
            let rules2 = { ...rules };
            rules2["technician"] = null;
            rules2["case_status"] = { id: (0, typeorm_1.In)([2]) };
            arr2 = await this.caseService.findCase({
                where: rules2,
                relations: relations,
            });
        }
        console.log(JSON.stringify(rules));
        let arr1 = await this.caseService.findCase({
            where: rules,
            relations: relations,
        });
        console.log("len", arr1.length, arr2.length);
        response = arr1.concat(arr2);
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async worktradeStatus(bodyData, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let response = null;
        let rules = {};
        if (bodyData["type"])
            rules["casetype"] = { id: (0, typeorm_1.In)(bodyData["type"]) };
        if (bodyData["status"])
            rules["case_status"] = { id: (0, typeorm_1.In)(bodyData["status"]) };
        if (data["id"])
            rules["worktrade"] = { users: { id: data["id"] } };
        if (data["id"])
            rules["equipment"] = { company: { user: { id: data["id"] } } };
        if (data["usertype"])
            rules["usertype"] = { usertype: data["usertype"] };
        if (bodyData["endRange"] == 0) {
            response = await this.caseService.findCase({
                where: rules,
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                ],
            });
        }
        else {
            response = await this.caseService.findCase({
                where: {
                    worktrade: { users: { id: data["id"] } },
                    equipment: { company: { user: { id: data["id"] } } },
                    case_status: { id: (0, typeorm_1.In)(bodyData["status"]) },
                    request_date: (0, typeorm_1.Between)(bodyData["startRange"], bodyData["endRange"]),
                },
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                ],
            });
        }
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async UnassignedWorkOrder(bodyData, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let response = null;
        if (bodyData["endRange"] == 0) {
            response = await this.caseService.findCase({
                where: {
                    worktrade: { users: { id: data["id"] } },
                    equipment: { company: { user: { id: data["id"] } } },
                    case_status: { id: (0, typeorm_1.In)(bodyData["status"]) },
                },
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                ],
            });
        }
        else {
            response = await this.caseService.findCase({
                where: {
                    worktrade: { users: { id: data["id"] } },
                    equipment: { company: { user: { id: data["id"] } } },
                    case_status: { id: (0, typeorm_1.In)(bodyData["status"]) },
                    request_date: (0, typeorm_1.Between)(bodyData["startRange"], bodyData["endRange"]),
                },
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                ],
            });
        }
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async techStatus(bodyData, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let response = null;
        if (bodyData["endRange"] == 0) {
            response = await this.caseService.findCase({
                where: {
                    technician: { maintainer: { id: data["id"] } },
                    case_status: { id: (0, typeorm_1.In)(bodyData["status"]) },
                },
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                ],
            });
        }
        else {
            response = await this.caseService.findCase({
                where: {
                    technician: { maintainer: { id: data["id"] } },
                    case_status: { id: (0, typeorm_1.In)(bodyData["status"]) },
                    request_date: (0, typeorm_1.Between)(bodyData["startRange"], bodyData["endRange"]),
                },
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                ],
            });
        }
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async userStatus(bodyData, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let response = null;
        if (bodyData["endRange"] == 0) {
            response = await this.caseService.findCase({
                where: {
                    requestor: { id: data["id"] },
                    case_status: { id: (0, typeorm_1.In)(bodyData["status"]) },
                },
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                ],
            });
        }
        else {
            response = await this.caseService.findCase({
                where: {
                    requestor: { id: data["id"] },
                    case_status: { id: (0, typeorm_1.In)(bodyData["status"]) },
                    request_date: (0, typeorm_1.Between)(bodyData["startRange"], bodyData["endRange"]),
                },
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                ],
            });
        }
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async allPPM(bodyData, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.caseService.getPPM(data, bodyData);
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async delPPM(ppmList) {
        let response = null;
        ppmList.forEach(async (element) => {
            response = await this.caseService.remove(element.id);
        });
        return {
            message: "success",
        };
    }
    async savePPM(ppmList, ppmYear, startRange, endRange, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let firstYear = new Date(ppmYear, 0, 1);
        let firstYear2 = Math.round(firstYear.getTime() / 1000);
        let nextYear = new Date(ppmYear + 1, 0, 1);
        let nextYear2 = Math.round(nextYear.getTime() / 1000);
        if (endRange && startRange) {
            firstYear2 = startRange;
            nextYear2 = endRange;
        }
        const delPpm = await this.caseService.findCase({
            where: {
                casetype: { name: "PPM" },
                request_date: (0, typeorm_1.Between)(firstYear2, nextYear2),
                equipment: { company: { user: { id: data["id"] } } },
            },
        });
        for (const caseToDelete of delPpm) {
            await this.caseService.remove(caseToDelete.id);
        }
        ppmList.forEach(async (element) => {
            await this.caseService.create(element);
        });
        return {
            message: "success",
        };
    }
    async saveppmEq(ppmList, ppmYear, startRange, endRange, eqlist, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let firstYear = new Date(ppmYear, 0, 1);
        let firstYear2 = Math.round(firstYear.getTime() / 1000);
        let nextYear = new Date(ppmYear + 1, 0, 1);
        let nextYear2 = Math.round(nextYear.getTime() / 1000);
        if (endRange && startRange) {
            firstYear2 = startRange;
            nextYear2 = endRange;
        }
        const delPpm = await this.caseService.findCase({
            where: {
                casetype: { name: "PPM" },
                request_date: (0, typeorm_1.Between)(firstYear2, nextYear2),
                equipment: (0, typeorm_1.In)(eqlist),
            },
        });
        for (const caseToDelete of delPpm) {
            await this.caseService.remove(caseToDelete.id);
        }
        ppmList.forEach(async (element) => {
            await this.caseService.create(element);
        });
        return {
            message: "success",
        };
    }
    async create(createCaseData) {
        const response = await this.caseService.create(createCaseData);
        return response;
    }
    async update(id, updateCaseData, case_status, equipment) {
        const response = await this.caseService.findOne({ where: { id: id } });
        delete updateCaseData.technician;
        const response2 = await this.Case_StatusService.findOne({
            where: { id: case_status },
        });
        updateCaseData["case_status"] = { ...response2 };
        console.log(updateCaseData);
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            await this.caseService.update(id, updateCaseData);
            if (equipment) {
                await this.equipmentService.update(equipment.id, equipment);
            }
            return updateCaseData;
        }
    }
    async updaten(id, updateCaseData, case_status, equipment) {
        const response = await this.caseService.findOne({ where: { id: id } });
        delete updateCaseData.technician;
        const response2 = await this.Case_StatusService.findOne({
            where: { id: case_status },
        });
        updateCaseData["case_status"] = { ...response2 };
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            if (updateCaseData.case_status.id == 1) {
                const { cost, vendor_cost, material_cost, labour_cost } = await this.caseHistoryService.getCostsForCase(id);
                if (equipment) {
                    equipment.cost = equipment.cost + cost;
                    console.log("ade equipment cost", equipment.cost);
                    await this.equipmentService.update(equipment.id, equipment);
                    console.log("ade equipment", equipment);
                }
                updateCaseData.cost = cost;
                updateCaseData.vendor_cost = vendor_cost;
                updateCaseData.material_cost = material_cost;
                updateCaseData.labour_cost = labour_cost;
                updateCaseData.end_date = Math.floor(Date.now() / 1000);
            }
            if (updateCaseData.case_status.id == 4) {
                updateCaseData.inspected_time = Math.floor(Date.now() / 1000);
            }
            if (updateCaseData.case_status.id == 5) {
                updateCaseData.on_action_time = Math.floor(Date.now() / 1000);
                const currentCase = await this.caseService.findOne({
                    where: { id: updateCaseData.id },
                });
                if (currentCase.pause_time > 0) {
                    updateCaseData.pause_duration =
                        Math.floor(Date.now() / 1000) -
                            currentCase.pause_time +
                            Number(currentCase.pause_duration);
                }
            }
            if (updateCaseData.case_status.id == 6) {
                updateCaseData.action_done_time = Math.floor(Date.now() / 1000);
            }
            if (updateCaseData.case_status.id == 8) {
                updateCaseData.pause_time = Math.floor(Date.now() / 1000);
            }
            await this.caseService.update(id, updateCaseData);
            return updateCaseData;
        }
    }
    async update2(updateCaseData) {
        var _a;
        const response = await this.caseService.findOne({
            where: { id: updateCaseData.id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            if (updateCaseData["anotdata"]) {
                if (!((_a = response.add_data) === null || _a === void 0 ? void 0 : _a.length)) {
                    updateCaseData.add_data =
                        updateCaseData.id +
                            Date.now() +
                            "-" +
                            Math.round(Math.random() * 1e9) +
                            ".json";
                }
                else {
                    updateCaseData.add_data = response.add_data;
                }
                Object.keys(updateCaseData["anotdata"]).forEach((key) => {
                    if (key.toLowerCase().includes("_sign")) {
                        console.log(`Key "${key}" contains 'sign'.`);
                        updateCaseData["anotdata"][key] = this.GeneralService.savebase64("/opt/bitnami/apache/htdocs/img/sign/", updateCaseData["anotdata"][key].value);
                    }
                });
                const filePath = "/opt/bitnami/apache/htdocs/files/workorderdata/" +
                    updateCaseData.add_data;
                const localpath = "./images/" + updateCaseData.add_data;
                await this.GeneralService.writeJsonToFile(filePath, updateCaseData.anotdata);
            }
            await this.caseService.create(updateCaseData);
            if (updateCaseData.casehistory) {
                let cost = updateCaseData.casehistory.some((item) => item.status === "TOTAL COST");
                if (cost) {
                    let costhistory = updateCaseData.casehistory.find((item) => item.status === "TOTAL COST");
                    let inventoryList = costhistory["inventory"];
                    if (inventoryList) {
                        inventoryList.forEach(async (inventory) => {
                            let usage_history = {
                                id: 0,
                                count: inventory.quantity,
                                inventory: inventory,
                                cases: updateCaseData.id,
                                inventorypricehistory: inventory.effectivePrice,
                                casehistory: costhistory,
                                datetime: costhistory.datetime,
                            };
                            await this.Inventory_UsageService.create(usage_history);
                        });
                    }
                }
            }
            if (updateCaseData["equipment"]) {
                const allCase = await this.caseService.findCase({
                    where: { equipment: updateCaseData["equipment"] },
                });
                updateCaseData["equipment"]["cost"] = allCase.reduce((accumulator, currentItem) => accumulator + currentItem.cost, 0);
                updateCaseData["equipment"]["material_cost"] = allCase.reduce((accumulator, currentItem) => accumulator + currentItem.material_cost, 0);
                updateCaseData["equipment"]["vendor_cost"] = allCase.reduce((accumulator, currentItem) => accumulator + currentItem.vendor_cost, 0);
                updateCaseData["equipment"]["labour_cost"] = allCase.reduce((accumulator, currentItem) => accumulator + currentItem.labour_cost, 0);
                await this.equipmentService.update2(updateCaseData["equipment"]["id"], updateCaseData["equipment"]);
            }
            return {
                message: "Workorder Save",
            };
        }
    }
    async delete(id) {
        const response = await this.caseService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.caseService.remove(id);
            return response;
        }
    }
    async findDetail(id) {
        const response = await this.caseService.findOne({
            where: { id: id },
            relations: [
                "casehistory.updater",
                "casehistory.inventoryusage.inventorypricehistory.inventory",
                "equipment.cases.casetype",
                "equipment.department",
                "equipment.subarea",
                "equipment.eq_type",
                "equipment.eq_classification",
                "equipment.eq_brand",
                "equipment.eq_model",
                "equipment.worktrade",
                "equipment_type",
                "equipment.subarea.area",
                "casetype",
                "worktrade.grouplist",
                "case_status",
                "technician",
                "technician.maintainer",
                "location.area.department",
                "equipment.cases.casetype",
                "equipment.cases.worktrade",
                "equipment.cases.case_status",
                "equipment.cases.technician",
                "equipment.cases.technician.maintainer",
                "equipment.cases.location.area.department",
                "requestor.company",
                "ppm.ppmchecklist",
            ],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            delete response.requestor.password;
            if (response.casehistory) {
                response.casehistory.forEach((item) => {
                    if (item.updater) {
                        delete item.updater.password;
                    }
                });
            }
            return response;
        }
    }
    async workorder(idList) {
        let response;
        if (Array.isArray(idList)) {
            response = await this.caseService.findAll({
                where: { id: (0, typeorm_1.In)(idList) },
                relations: [
                    "casehistory",
                    "casehistory.updater",
                    "casehistory.inventoryusage.inventorypricehistory.inventory",
                    "equipment",
                    "equipment.cases",
                    "equipment.cases.casetype",
                    "casetype",
                    "worktrade.grouplist",
                    "equipment.department",
                    "equipment.subarea",
                    "case_status",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                    "equipment.worktrade",
                    "technician",
                    "technician.maintainer",
                    "equipment.subarea.area",
                    "location.area.department",
                    "equipment_type",
                    "equipment.eq_category",
                    "equipment.umdns",
                    "ppm.ppmchecklist",
                ],
            });
        }
        else {
            response = await this.caseService.findAll({
                where: { equipment: { id: parseInt(Object.keys(idList)[0]) } },
                relations: [
                    "casehistory",
                    "casehistory.updater",
                    "casehistory.inventoryusage.inventorypricehistory.inventory",
                    "equipment",
                    "equipment.cases",
                    "equipment.cases.casetype",
                    "casetype",
                    "worktrade.grouplist",
                    "equipment.department",
                    "equipment.subarea",
                    "case_status",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                    "equipment.worktrade",
                    "technician",
                    "technician.maintainer",
                    "equipment.subarea.area",
                    "location.area.department",
                    "equipment_type",
                    "equipment.eq_category",
                    "equipment.umdns",
                    "ppm.ppmchecklist",
                ],
            });
        }
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async getAllCaseList() {
        const id = 3;
        const response = await this.caseService.findAll({
            where: [
                { worktrade: { users: { id: id } } },
                { worktrade: { grouplist: { users: { id: id } } } },
            ],
            relations: ["equipment", "casetype", "equipment.worktrade", "technician"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    uploadFiles(body, files) {
        console.log(files);
        console.log(body["Name"]);
    }
    async createcase(body, files, request) {
        var _a;
        const cookie = request.cookies["jwt"];
        const reporter = await this.jwtService.verifyAsync(cookie);
        const n = (_a = files === null || files === void 0 ? void 0 : files.length) !== null && _a !== void 0 ? _a : 0;
        const arr = [];
        body.image_file = "";
        if (n >= 1) {
            for (let i = 0; i < n; i++) {
                arr.push(files[i].filename);
            }
            body.image_file = arr.toString();
        }
        if (body["anotdata"]) {
            body.add_data =
                body.id + Date.now() + "-" + Math.round(Math.random() * 1e9) + ".json";
            Object.keys(body["anotdata"]).forEach((key) => {
                if (key.toLowerCase().includes("_sign")) {
                    console.log(`Key "${key}" contains 'sign'.`);
                    body["anotdata"][key] = this.GeneralService.savebase64("./images/", body["anotdata"][key].value);
                }
            });
            const filePath = "/opt/bitnami/apache/htdocs/files/workorderdata/" + body.add_data;
            const localpath = "./images/" + body.add_data;
            await this.GeneralService.writeJsonToFile(filePath, body.anotdata);
        }
        const response = await this.caseService.create(body);
        const data = { name: "cases" };
        const users = await this.AuthService.findAll({
            where: { worktrade: body.worktrade },
        });
        const userIds = users.map((user) => ({ id: user.id, email: user.email }));
        userIds.forEach(async (user) => {
            const noti = await this.notificationsService.create({
                name: "cases",
                user: user,
                cases: response["id"],
            });
            this.notificationsService
                .finduser({
                where: { id: noti.id },
                relations: [
                    "cases",
                    "cases.equipment",
                    "cases.case_status",
                    "cases.equipment.subarea",
                    "cases.casetype",
                    "cases.equipment.eq_type",
                    "cases.equipment.eq_classification",
                    "cases.equipment.eq_brand",
                    "cases.equipment.eq_model",
                    "cases.location.area.department",
                    "casehistory",
                    "casehistory.cases",
                    "news",
                    "news.publisher",
                    "casehistory.old_status",
                    "casehistory.new_status",
                    "cases.equipment_type",
                ],
            })
                .then((noti) => {
                this.casegateway.newnotify(user.email, noti[0]);
            });
        });
        return response;
    }
    async noti(email) {
        this.casegateway.newnotify(email, {});
        console.log("sini run");
    }
    async noti2(email, body) {
        this.casegateway.newnotify(email, body);
        console.log("sini run", email, body);
    }
    uploadfile(files) {
        console.log(files, "mana?");
        return "success";
    }
    dateToEpoch(thedate) {
        const time = thedate.getTime();
        const diff = thedate.getTimezoneOffset();
        return (time - ((time % 86400000) + Math.abs(diff) * 60000)) / 1000;
    }
    get3Date() {
        const currentDate = new Date();
        const currentDate2 = this.dateToEpoch(new Date());
        console.log("currentDate " + currentDate);
        console.log("currentDate2 " + currentDate2);
        const prevDate = currentDate.setDate(currentDate.getDate() - 1);
        const prevDate2 = this.dateToEpoch(new Date(prevDate));
        const nextDate = currentDate.setDate(currentDate.getDate() + 2);
        const nextDate2 = this.dateToEpoch(new Date(nextDate));
        const lusaDate = currentDate.setDate(currentDate.getDate() + 1);
        const lusaDate2 = this.dateToEpoch(new Date(lusaDate));
        const firstDate = currentDate.getFullYear();
        currentDate.setFullYear(firstDate, 0, 1);
        const firstDate2 = this.dateToEpoch(new Date(currentDate));
        const lastDate = currentDate.getFullYear();
        currentDate.setFullYear(lastDate, 11, 32);
        const lastDate2 = this.dateToEpoch(new Date(currentDate));
        const thisYear = currentDate.getFullYear();
        const thisMonth = currentDate.getMonth();
        currentDate.setFullYear(thisYear, thisMonth, 1);
        const StartMonth = this.dateToEpoch(new Date(currentDate));
        const NextMonth = currentDate.getMonth() + 1;
        currentDate.setFullYear(thisYear, NextMonth, 1);
        const EndMonth = this.dateToEpoch(new Date(currentDate));
        return {
            semalamDate: prevDate2,
            hariniDate: currentDate2,
            esokDate: nextDate2,
            lusaDate: lusaDate2,
            firstDate: firstDate2,
            lastDate: lastDate2,
            StartMonth: StartMonth,
            EndMonth: EndMonth,
        };
    }
    async createcases(body, files) {
        const n = files.length;
        const arr = [];
        body.image_file = "";
        if (n >= 1) {
            for (let i = 0; i < n; i++) {
                arr.push(files[i].filename);
            }
            body.image_file = arr.toString();
        }
        console.log("casehistory/create");
        const response = this.caseHistoryService.create(body);
        return response;
    }
    async downloaddata(res) {
        const result = await this.caseService.downloaddata();
        res.download(`${result}`);
    }
    async testdownloadExcelData(res) {
        const data = await this.caseService.findAll({
            relations: ["casehistory", "technician"],
        });
        const fileNamePrefix = "case";
        let columns = {
            case: [
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "request_date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "request_date",
                },
                {
                    field: "contact_name",
                    format: (value) => `${value}`,
                    label: "contact_name",
                },
                {
                    field: "cost",
                    format: (value) => `${value}`,
                    label: "cost",
                },
                {
                    field: "description",
                    format: (value) => `${value}`,
                    label: "description",
                },
                {
                    field: "image_file",
                    format: (value) => `${value}`,
                    label: "image_file",
                },
                {
                    field: "expected_day_taken",
                    format: (value) => `${value}`,
                    label: "expected_day_taken",
                },
                {
                    field: "end_date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "end_date",
                },
            ],
            casehistory: [
                {
                    field: "case_id",
                    format: (value) => `${value}`,
                    label: "case_id",
                },
                {
                    field: "case_name",
                    format: (value) => `${value}`,
                    label: "case_name",
                },
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "datetime",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "datetime",
                },
                {
                    field: "description",
                    format: (value) => `${value}`,
                    label: "description",
                },
                {
                    field: "status",
                    format: (value) => `${value}`,
                    label: "status",
                },
                {
                    field: "image_file",
                    format: (value) => `${value}`,
                    label: "image_file",
                },
                {
                    field: "sign",
                    format: (value) => `${value}`,
                    label: "sign",
                },
                {
                    field: "cost",
                    format: (value) => `${value}`,
                    label: "cost",
                },
            ],
            technician: [
                {
                    field: "case_id",
                    format: (value) => `${value}`,
                    label: "case_id",
                },
                {
                    field: "case_name",
                    format: (value) => `${value}`,
                    label: "case_name",
                },
                {
                    field: "rate",
                    format: (value) => `${value}`,
                    label: "rate",
                },
                {
                    field: "cost",
                    format: (value) => `${value}`,
                    label: "cost",
                },
                {
                    field: "main_hour",
                    format: (value) => `${value}`,
                    label: "main_hour",
                },
            ],
        };
        const filePath = await this.GeneralService.downloadExcelData(this.GeneralService.flattenArrayOfObjects(fileNamePrefix, data), fileNamePrefix, columns, true);
        res.download(filePath);
    }
    async getFormData(request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const eqList = await this.equipmentService.findEquipment({
            where: { company: { user: { id: data["id"] } } },
            relations: [
                "worktrade",
                "subarea",
                "subarea.area",
                "department",
                "department.area",
                "subarea.area.subarea",
                "worktrade.grouplist",
                "worktrade.grouplist.worktradelist",
                "eq_type",
                "eq_classification",
                "eq_brand",
                "eq_model",
            ],
        });
        const groupList = await this.GroupListService.groupByCompany(data);
        const areaList = await this.AreaService.findArea({
            where: { company: { user: { id: data["id"] } } },
            relations: ["subarea"],
        });
        const casetype = await this.casetypeService.findAllC(data.id, data.usertype);
        const users = await this.AuthService.findAll({
            where: { company: { user: { id: data["id"] } } },
            relations: [
                "usertypes",
                "worktrade",
                "department",
                "grouplist",
                "grouplist.worktradelist",
                "company",
            ],
        });
        const userlist = users.map((user) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        const asset_statusList = await this.asset_statusService.findAll();
        const qcList = await this.qcservice.classByCompany(data);
        const casestatusList = await this.case_statusService.findAll({});
        return {
            eqList: eqList,
            groupList: groupList,
            areaList: areaList,
            casetypeList: casetype,
            userlist: userlist,
            asset_statusList: asset_statusList,
            qcList: qcList,
            casestatusList: casestatusList,
        };
    }
    async fitlerData(request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const departments = await this.departmentService.findDepartment({
            where: { company: { user: { id: data["id"] } } },
            relations: ["area.subarea"],
        });
        const casetypeList = await this.casetypeService.findbyUser({
            where: { company: { user: { id: data["id"] } } },
        });
        const groupList = await this.GroupListService.groupByCompany(data);
        return {
            departmentList: departments,
            casetypeList: casetypeList,
            groupList: groupList,
        };
    }
    async summarycm7(request, startdate, enddate) {
        var _a;
        const cookie = request.cookies["jwt"];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const data = await this.caseService.findAll({
            where: {
                equipment: {
                    company: {
                        user: { id: dataj["id"] },
                    },
                },
                request_date: (0, typeorm_1.Between)(startdate, enddate),
                casetype: {
                    name: "Corrective",
                },
            },
            relations: [
                "equipment",
                "equipment.department",
                "case_status",
                "casetype",
                "equipment.company",
            ],
        });
        const departmentMap = new Map();
        let totalBrought = 0;
        let totalOutstanding = 0;
        let currentMonthComplete = 0;
        data.forEach((item) => {
            if (item.equipment &&
                item.equipment.department &&
                item.equipment.department.name) {
                const department = item.equipment.department.name.trim();
                if (departmentMap.has(department)) {
                    const departmentData = departmentMap.get(department);
                    departmentData.totalWorkOrder += 1;
                    if (item && item.case_status.id === 1) {
                        departmentData.currentMonthComplete += 1;
                        currentMonthComplete += 1;
                    }
                    if (item && item.brought_forward) {
                        departmentData.broughtForward += 1;
                        totalBrought += 1;
                    }
                    if (item && item.case_status.id !== 1) {
                        departmentData.outstanding += 1;
                        totalOutstanding += 1;
                    }
                }
                else {
                    const totalWorkOrder = 1;
                    let currentMonthComplete = item && item.case_status.id === 1 ? 1 : 0;
                    const broughtForward = item && item.brought_forward ? 1 : 0;
                    const outstanding = item && item.case_status.id != 1 ? 1 : 0;
                    departmentMap.set(department, {
                        totalWorkOrder,
                        currentMonthComplete,
                        broughtForward,
                        outstanding,
                    });
                    if (currentMonthComplete === 1) {
                        currentMonthComplete += 1;
                    }
                    if (broughtForward === 1) {
                        totalBrought += 1;
                    }
                    if (outstanding === 1) {
                        totalOutstanding += 1;
                    }
                }
            }
        });
        const reports = [];
        departmentMap.forEach(({ totalWorkOrder, currentMonthComplete, broughtForward, outstanding }, department) => {
            var _a;
            const report = {
                site: ((_a = dataj.company) === null || _a === void 0 ? void 0 : _a.name) || "Sample Site",
                type: "Corrective maintenance",
                Department: department,
                totalWorkOrder,
                currentMonthComplete,
                broughtForward,
                outstanding,
            };
            reports.push(report);
        });
        const report = {
            site: ((_a = dataj.company) === null || _a === void 0 ? void 0 : _a.name) || "Sample Site",
            type: data.length > 0 && data[0].casetype
                ? data[0].casetype.name
                : "Unknown Type",
            workOrderGenerated: data.length,
            workOrderBroughtForward: totalBrought,
            totalWorkOrder: data.length + totalBrought,
            currentMonthComplete,
            broughtForward: totalBrought,
            outstanding: totalOutstanding,
        };
        const summaryCols = [
            { name: "site", align: "center", field: "site", label: "site" },
            { name: "type", align: "center", field: "type", label: "Type" },
            {
                name: "workOrderGenerated",
                align: "center",
                field: "workOrderGenerated",
                label: "Work Order Generated",
            },
            {
                name: "workOrderBroughtForward",
                align: "center",
                field: "workOrderBroughtForward",
                label: "Work Order Brought Forward",
            },
            {
                name: "totalWorkOrder",
                align: "center",
                field: "totalWorkOrder",
                label: "Total Work Order",
            },
            {
                name: "currentMonthComplete",
                align: "center",
                field: "currentMonthComplete",
                label: "Current Month Completed",
            },
            {
                name: "broughtForward",
                align: "center",
                field: "broughtForward",
                label: "Brought Forward",
            },
            {
                name: "outstanding",
                align: "center",
                field: "outstanding",
                label: "Outstanding",
            },
        ];
        const detailsCols = [
            { name: "type", align: "center", field: "type", label: "Type" },
            { name: "site", align: "center", field: "site", label: "site" },
            {
                name: "Department",
                align: "center",
                field: "Department",
                label: "The Departmnet",
            },
            {
                name: "totalWorkOrder",
                align: "center",
                field: "totalWorkOrder",
                label: "Total Work Order",
            },
            {
                name: "currentMonthComplete",
                align: "center",
                field: "currentMonthComplete",
                label: "Current Month Complete",
            },
            {
                name: "broughtForward",
                align: "center",
                field: "broughtForward",
                label: "Brought Forward",
            },
            {
                name: "outstanding",
                align: "center",
                field: "outstanding",
                label: "Outstanding",
            },
        ];
        return {
            summary: report,
            details: reports,
            summaryCols,
            detailsCols,
        };
    }
    async getdata3(request) {
        const cookie = request.cookies["jwt"];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const response = await this.caseService.findAll({
            where: {
                equipment: {
                    company: {
                        user: { id: dataj["id"] },
                    },
                },
                casetype: {
                    name: "PPM",
                },
            },
            relations: [
                "equipment",
                "equipment.department",
                "case_status",
                "equipment.company",
                "technician",
                "technician.maintainer",
                "casehistory",
            ],
        });
        const report = response.flatMap((caseData) => {
            var _a, _b;
            const latestCase = caseData;
            const latestCaseHistory = latestCase === null || latestCase === void 0 ? void 0 : latestCase.casehistory[0];
            return {
                site: caseData.equipment.company.name,
                department: caseData.equipment.department.name,
                workorderno: caseData.id,
                assetno: caseData.equipment.asset_number,
                assetname: caseData.equipment.name,
                actualstartdate: new Date(caseData.request_date * 1000).toLocaleDateString(),
                actualcompletedate: caseData.end_date !== 0
                    ? new Date(caseData.end_date * 1000).toLocaleDateString()
                    : "NA",
                status: caseData.case_status.name,
                performed: ((_b = (_a = caseData === null || caseData === void 0 ? void 0 : caseData.technician[0]) === null || _a === void 0 ? void 0 : _a.maintainer) === null || _b === void 0 ? void 0 : _b.name) || "NA",
                verified: (latestCaseHistory === null || latestCaseHistory === void 0 ? void 0 : latestCaseHistory.user_name) || "NA",
                remark: latestCaseHistory
                    ? `${latestCaseHistory.status} ${latestCaseHistory.description}`
                    : "NA",
            };
        });
        return report;
    }
    async summaryppm(request, startdate, enddate) {
        var _a;
        const cookie = request.cookies["jwt"];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const data = await this.caseService.findAll({
            where: {
                equipment: {
                    company: {
                        user: { id: dataj["id"] },
                    },
                },
                request_date: (0, typeorm_1.Between)(startdate, enddate),
                casetype: {
                    name: "PPM",
                },
            },
            relations: [
                "equipment",
                "equipment.department",
                "case_status",
                "casetype",
                "equipment.company",
            ],
        });
        const departmentMap = new Map();
        let totalBrought = 0;
        let totalOutstanding = 0;
        let currentMonthComplete = 0;
        data.forEach((item) => {
            if (item.equipment &&
                item.equipment.department &&
                item.equipment.department.name) {
                const department = item.equipment.department.name.trim();
                if (departmentMap.has(department)) {
                    const departmentData = departmentMap.get(department);
                    departmentData.totalWorkOrder += 1;
                    if (item && item.case_status.id === 1) {
                        departmentData.currentMonthComplete += 1;
                        currentMonthComplete += 1;
                    }
                    if (item && item.brought_forward) {
                        departmentData.broughtForward += 1;
                        totalBrought += 1;
                    }
                    if (item && item.case_status.id !== 1) {
                        departmentData.outstanding += 1;
                        totalOutstanding += 1;
                    }
                }
                else {
                    const totalWorkOrder = 1;
                    let currentMonthComplete = item && item.case_status.id === 1 ? 1 : 0;
                    const broughtForward = item && item.brought_forward ? 1 : 0;
                    const outstanding = item && item.case_status.id != 1 ? 1 : 0;
                    departmentMap.set(department, {
                        totalWorkOrder,
                        currentMonthComplete,
                        broughtForward,
                        outstanding,
                    });
                    if (currentMonthComplete === 1) {
                        currentMonthComplete += 1;
                    }
                    if (broughtForward === 1) {
                        totalBrought += 1;
                    }
                    if (outstanding === 1) {
                        totalOutstanding += 1;
                    }
                }
            }
        });
        const reports = [];
        departmentMap.forEach(({ totalWorkOrder, currentMonthComplete, broughtForward, outstanding }, department) => {
            var _a;
            const report = {
                site: ((_a = dataj.company) === null || _a === void 0 ? void 0 : _a.name) || "Sample Site",
                type: data.length > 0 && data[0].casetype
                    ? data[0].casetype.name
                    : "Unknown Type",
                Department: department,
                totalWorkOrder,
                currentMonthComplete,
                broughtForward,
                Reschedule: outstanding,
            };
            reports.push(report);
        });
        const report = {
            site: ((_a = dataj.company) === null || _a === void 0 ? void 0 : _a.name) || "Sample Site",
            type: data.length > 0 && data[0].casetype
                ? data[0].casetype.name
                : "Unknown Type",
            workOrderGenerated: data.length,
            workOrderBroughtForward: totalBrought,
            totalWorkOrder: data.length + totalBrought,
            currentMonthComplete,
            broughtForward: totalBrought,
            Reschedule: totalOutstanding,
        };
        const summaryCols = [
            { name: "site", align: "center", field: "site", label: "site" },
            { name: "type", align: "center", field: "type", label: "Type" },
            {
                name: "workOrderGenerated",
                align: "center",
                field: "workOrderGenerated",
                label: "Work Order Generated",
            },
            {
                name: "workOrderBroughtForward",
                align: "center",
                field: "workOrderBroughtForward",
                label: "Work Order Brought Forward",
            },
            {
                name: "totalWorkOrder",
                align: "center",
                field: "totalWorkOrder",
                label: "Total Work Order",
            },
            {
                name: "currentMonthComplete",
                align: "center",
                field: "currentMonthComplete",
                label: "Within Schedule",
            },
            {
                name: "broughtForward",
                align: "center",
                field: "broughtForward",
                label: "Brought Forward",
            },
            {
                name: "Reschedule",
                align: "center",
                field: "Reschedule",
                label: "Reschedule",
            },
        ];
        const detailsCols = [
            { name: "type", align: "center", field: "type", label: "Type" },
            { name: "site", align: "center", field: "site", label: "site" },
            {
                name: "Department",
                align: "center",
                field: "Department",
                label: "The Departmnet",
            },
            {
                name: "totalWorkOrder",
                align: "center",
                field: "totalWorkOrder",
                label: "Total Work Order",
            },
            {
                name: "currentMonthComplete",
                align: "center",
                field: "currentMonthComplete",
                label: "Within Schedule",
            },
            {
                name: "broughtForward",
                align: "center",
                field: "broughtForward",
                label: "Brought Forward",
            },
            {
                name: "Reschedule",
                align: "center",
                field: "Reschedule",
                label: "Reschedule",
            },
        ];
        return {
            summary: report,
            details: reports,
            summaryCols,
            detailsCols,
        };
    }
    async summary(request, year, month) {
        var _a;
        const cookie = request.cookies["jwt"];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const startDate = Math.floor(new Date(year, month - 1, 1).getTime() / 1000);
        const endDate = Math.floor(new Date(year, month, 0).getTime() / 1000);
        const data = await this.caseService.findAll({
            where: {
                equipment: {
                    company: {
                        id: dataj["id"],
                    },
                },
                request_date: (0, typeorm_1.Between)(startDate, endDate),
            },
            relations: [
                "equipment",
                "equipment.department",
                "case_status",
                "casetype",
                "equipment.company",
            ],
        });
        const departmentMap = new Map();
        let totalBrought = 0;
        let totalOutstanding = 0;
        let currentMonthComplete = 0;
        data.forEach((item) => {
            if (item.equipment &&
                item.equipment.department &&
                item.equipment.department.name) {
                const department = item.equipment.department.name.trim();
                if (departmentMap.has(department)) {
                    const departmentData = departmentMap.get(department);
                    departmentData.totalWorkOrder += 1;
                    if (item && item.case_status.id === 1) {
                        departmentData.currentMonthComplete += 1;
                        currentMonthComplete += 1;
                    }
                    if (item && item.brought_forward) {
                        departmentData.broughtForward += 1;
                        totalBrought += 1;
                    }
                    if (item && item.case_status.id !== 1) {
                        departmentData.outstanding += 1;
                        totalOutstanding += 1;
                    }
                }
                else {
                    const totalWorkOrder = 1;
                    let currentMonthComplete = item && item.case_status.id === 1 ? 1 : 0;
                    const broughtForward = item && item.brought_forward ? 1 : 0;
                    const outstanding = item && item.case_status.id != 1 ? 1 : 0;
                    departmentMap.set(department, {
                        totalWorkOrder,
                        currentMonthComplete,
                        broughtForward,
                        outstanding,
                    });
                    if (currentMonthComplete === 1) {
                        currentMonthComplete += 1;
                    }
                    if (broughtForward === 1) {
                        totalBrought += 1;
                    }
                    if (outstanding === 1) {
                        totalOutstanding += 1;
                    }
                }
            }
        });
        const reports = [];
        departmentMap.forEach(({ totalWorkOrder, currentMonthComplete, broughtForward, outstanding }, department) => {
            var _a;
            const report = {
                site: ((_a = dataj.company) === null || _a === void 0 ? void 0 : _a.name) || "Sample Site",
                type: data.length > 0 && data[0].casetype
                    ? data[0].casetype.name
                    : "Unknown Type",
                Department: department,
                totalWorkOrder,
                currentMonthComplete,
                broughtForward,
                Reschedule: outstanding,
            };
            reports.push(report);
        });
        const report = {
            site: ((_a = dataj.company) === null || _a === void 0 ? void 0 : _a.name) || "Sample Site",
            type: data.length > 0 && data[0].casetype
                ? data[0].casetype.name
                : "Unknown Type",
            workOrderGenerated: data.length,
            workOrderBroughtForward: totalBrought,
            totalWorkOrder: data.length + totalBrought,
            currentMonthComplete,
            broughtForward: totalBrought,
            Reschedule: totalOutstanding,
        };
        const summaryCols = [
            { name: "site", align: "center", field: "site", label: "site" },
            { name: "type", align: "center", field: "type", label: "Type" },
            {
                name: "workOrderGenerated",
                align: "center",
                field: "workOrderGenerated",
                label: "Work Order Generated",
            },
            {
                name: "workOrderBroughtForward",
                align: "center",
                field: "workOrderBroughtForward",
                label: "Work Order Brought Forward",
            },
            {
                name: "totalWorkOrder",
                align: "center",
                field: "totalWorkOrder",
                label: "Total Work Order",
            },
            {
                name: "currentMonthComplete",
                align: "center",
                field: "currentMonthComplete",
                label: "Within Schedule",
            },
            {
                name: "broughtForward",
                align: "center",
                field: "broughtForward",
                label: "Brought Forward",
            },
            {
                name: "Reschedule",
                align: "center",
                field: "Reschedule",
                label: "Reschedule",
            },
        ];
        const detailsCols = [
            { name: "type", align: "center", field: "type", label: "Type" },
            { name: "site", align: "center", field: "site", label: "site" },
            {
                name: "Department",
                align: "center",
                field: "Department",
                label: "The Departmnet",
            },
            {
                name: "totalWorkOrder",
                align: "center",
                field: "totalWorkOrder",
                label: "Total Work Order",
            },
            {
                name: "currentMonthComplete",
                align: "center",
                field: "currentMonthComplete",
                label: "Within Schedule",
            },
            {
                name: "broughtForward",
                align: "center",
                field: "broughtForward",
                label: "Brought Forward",
            },
            {
                name: "Reschedule",
                align: "center",
                field: "Reschedule",
                label: "Reschedule",
            },
        ];
        return {
            summary: report,
            details: reports,
            summaryCols,
            detailsCols,
        };
    }
    async summaryAndEquipment3(request, startdate, enddate) {
        const cookie = request.cookies["jwt"];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const caseData = await this.departmentService.findDepartment({
            where: {
                equipment: {
                    company: {
                        user: { id: dataj["id"] },
                    },
                    cases: {
                        request_date: (0, typeorm_1.Between)(startdate, enddate),
                        case_status: (0, typeorm_1.Not)((0, typeorm_1.In)([2, 3, 8])),
                    },
                },
            },
            relations: [
                "equipment",
                "equipment.cases",
                "equipment.cases.case_status",
                "equipment.cases.casetype",
                "equipment.company",
                "company",
            ],
        });
        const reports = [];
        let totalWorkOrder = 0;
        let broughtForward = 0;
        let ontime = 0;
        let late = 0;
        caseData.forEach((department) => {
            const departmentReport = {
                site: department.company.name,
                department: department.name,
                totalWorkOrder: 0,
                broughtForward: 0,
                totalAssets: 0,
                active: 0,
                ontime: 0,
                late: 0,
                z: 0,
            };
            department.equipment.forEach((equipment) => {
                departmentReport.totalWorkOrder += equipment.cases.length;
                departmentReport.totalAssets++;
                if (equipment.status.id == 1) {
                    departmentReport.active++;
                    equipment.cases.forEach((caseItem) => {
                        departmentReport.z++;
                        if (caseItem.request_date && caseItem.inspected_time) {
                            const caltotal = caseItem.inspected_time - caseItem.request_date;
                            if (caltotal <= 30 * 60) {
                                departmentReport.ontime++;
                            }
                            else {
                                departmentReport.late++;
                            }
                        }
                        if (caseItem.hasOwnProperty("brought_forward") &&
                            caseItem.brought_forward === true) {
                            departmentReport.broughtForward++;
                        }
                    });
                }
            });
            reports.push(departmentReport);
            totalWorkOrder += departmentReport.totalWorkOrder;
            broughtForward += departmentReport.broughtForward;
            ontime += departmentReport.ontime;
            late += departmentReport.late;
        });
        const report = {
            site: dataj.company.name,
            workrequest: totalWorkOrder,
            broughtForward: broughtForward,
            totalWorkrequest: broughtForward + totalWorkOrder,
            ontime: ontime,
            late: late,
        };
        const summaryCols = [
            { name: "site", align: "center", field: "site", label: "Site" },
            {
                name: "workrequest",
                align: "center",
                field: "workrequest",
                label: "Work Request",
            },
            {
                name: "broughtForward",
                align: "center",
                field: "broughtForward",
                label: "Brought Forward",
            },
            {
                name: "totalWorkrequest",
                align: "center",
                field: "totalWorkrequest",
                label: "Total Work Request",
            },
            {
                name: "respondTime",
                align: "center",
                label: "Respond Time",
                children: [
                    { name: "ontime", align: "center", field: "ontime", label: "Ontime" },
                    { name: "late", align: "center", field: "late", label: "Late" },
                ],
            },
        ];
        const detailsCols = [
            { name: "site", align: "center", field: "site", label: "Site" },
            {
                name: "department",
                align: "center",
                field: "department",
                label: "Department",
            },
            {
                name: "totalWorkOrder",
                align: "center",
                field: "totalWorkOrder",
                label: "Total Work Order",
            },
            {
                name: "broughtForward",
                align: "center",
                field: "broughtForward",
                label: "Brought Forward",
            },
            { name: "active", align: "center", field: "active", label: "Active" },
            {
                name: "respondTime",
                align: "center",
                label: "Respond Time",
                children: [
                    { name: "ontime", align: "center", field: "ontime", label: "Ontime" },
                    { name: "late", align: "center", field: "late", label: "Late" },
                ],
            },
        ];
        return {
            summary: report,
            details: reports,
            summaryCols,
            detailsCols,
        };
    }
    async costwk(request) {
        const cookie = request.cookies["jwt"];
        const dataj = await this.jwtService.verifyAsync(cookie);
        console.log(dataj);
        const caseData = await this.caseService.findAll({
            where: {},
            relations: [
                "equipment_type",
                "worktrade",
                "rating",
                "worktrade.groupmain",
                "worktrade.groupmain.eqtype",
                "worktrade.groupmain.eqtype.ppmchecklist",
                "worktrade.groupmain.eqtype.ppmchecklist.serviceContract",
            ],
        });
        const report = [];
        caseData.forEach((item) => {
            const worktrade = item.worktrade;
            if (worktrade && worktrade.groupmain) {
                worktrade.groupmain.forEach((group) => {
                    if (group.eqtype) {
                        group.eqtype.forEach((eqtype) => {
                            if (eqtype.ppmchecklist) {
                                eqtype.ppmchecklist.forEach((ppmchecklist) => {
                                    const reportItem = {
                                        name: ppmchecklist.name,
                                        referenceNo: ppmchecklist.referenceNo,
                                        contractPrice: ppmchecklist.serviceContract.length > 0
                                            ? ppmchecklist.serviceContract[0].contract_value
                                            : 0,
                                        rating: item.rating.name,
                                    };
                                    report.push(reportItem);
                                });
                            }
                        });
                    }
                });
            }
        });
        return caseData;
    }
    async costwk4(request) {
        const cookie = request.cookies["jwt"];
        const dataj = await this.jwtService.verifyAsync(cookie);
        console.log(dataj);
        const caseData = await this.caseService.findAll({
            where: {
                id: 596,
            },
            relations: [
                "equipment_type",
                "worktrade",
                "rating",
                "ppm",
                "rating.deduction",
                "worktrade.groupmain",
                "worktrade.groupmain.eqtype",
                "worktrade.groupmain.eqtype.ppmchecklist",
                "worktrade.groupmain.eqtype.ppmchecklist.serviceContract",
            ],
        });
        const report = new Map();
        caseData.forEach((item) => {
            const worktrade = item.worktrade;
            if (worktrade && worktrade.groupmain) {
                worktrade.groupmain.forEach((group) => {
                    if (group.eqtype) {
                        group.eqtype.forEach((eqtype) => {
                            if (eqtype.ppmchecklist) {
                                eqtype.ppmchecklist.forEach((ppmchecklist) => {
                                    var _a, _b, _c;
                                    const deductionPercentage = ((_b = (_a = item.rating) === null || _a === void 0 ? void 0 : _a.deduction) === null || _b === void 0 ? void 0 : _b.percentage) || 0;
                                    const contractValue = ppmchecklist.serviceContract.length > 0
                                        ? ppmchecklist.serviceContract[0].contract_value
                                        : 0;
                                    const deductPer = (-1 * (contractValue * deductionPercentage)) / 100;
                                    const payablefee = contractValue + deductPer;
                                    const secondinday = 24 * 60 * 60;
                                    console.log(deductPer);
                                    const reportItem = {
                                        "No.": "a",
                                        Indicators: ppmchecklist.name,
                                        "Checklist Ref. No.": ppmchecklist.referenceNo,
                                        "Frequency for 5 Years": 20,
                                        "Payment Fee for 5 Years (RM)": ppmchecklist.serviceContract.length > 0
                                            ? ppmchecklist.serviceContract[0].contract_value * 20
                                            : 0,
                                        Quantity: 1,
                                        "Unit (Unit / Lot / Nos)": "Lot",
                                        "Quantity of Checklist by Department / Block / Nos (Planned)": 2,
                                        "Quantity of Checklist by Department / Block / Nos (Actual)": 2,
                                        "Contract Price / Frequency (RM)": contractValue.toFixed(2),
                                        "Monthly Planned Work": 1,
                                        "Monthly Planned Fee (RM)": 2550.0,
                                        "Monthly Actual Work Done": 1,
                                        "Monthly Actual Fee (RM)": contractValue.toFixed(2),
                                        Rating: ((_c = item.rating) === null || _c === void 0 ? void 0 : _c.name) || "N/A",
                                        "Monthly Deductible Fee (RM)": deductPer.toFixed(2),
                                        "Monthly Payable Fee (RM)": payablefee.toFixed(2),
                                    };
                                    if (report.has(eqtype.name)) {
                                        report.get(eqtype.name).push(reportItem);
                                    }
                                    else {
                                        report.set(eqtype.name, [reportItem]);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        const transformedReport = Array.from(report).map(([eqtypeName, reportItems]) => ({
            eqtype: {
                name: eqtypeName,
                reportitem: reportItems,
            },
        }));
        return transformedReport;
    }
    async savechecklist(bodyData, request) {
        const response = await this.caseService.findOne({
            where: { id: bodyData.id },
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            if (response.ppmdata == null) {
                response.ppmdata =
                    bodyData.id +
                        Date.now() +
                        "-" +
                        Math.round(Math.random() * 1e9) +
                        ".json";
            }
            const filePath = "/opt/bitnami/apache/htdocs/files/ppmchecklistdata/" + response.ppmdata;
            const localpath = "./images/" + response.ppmdata;
            await this.GeneralService.writeJsonToFile(filePath, bodyData.ppmdata);
            await this.caseService.update(bodyData.id, response);
            return {
                message: "Checklist Save",
            };
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/data"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "data", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("date/:startRange/:endRange"),
    __param(0, (0, common_1.Param)("startRange")),
    __param(1, (0, common_1.Param)("endRange")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "byRange", null);
__decorate([
    (0, common_1.Post)("worktrade/all"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "worktradeAll", null);
__decorate([
    (0, common_1.Post)("worktrade/status"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "worktradeStatus", null);
__decorate([
    (0, common_1.Post)("worktrade/status/wo"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "UnassignedWorkOrder", null);
__decorate([
    (0, common_1.Post)("tech/status"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "techStatus", null);
__decorate([
    (0, common_1.Post)("user/status"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "userStatus", null);
__decorate([
    (0, common_1.Post)("all/ppm"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "allPPM", null);
__decorate([
    (0, common_1.Post)("delPPM"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "delPPM", null);
__decorate([
    (0, common_1.Post)("savePPM"),
    __param(0, (0, common_1.Body)("ppmList")),
    __param(1, (0, common_1.Body)("ppmYear")),
    __param(2, (0, common_1.Body)("startRange")),
    __param(3, (0, common_1.Body)("endRange")),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "savePPM", null);
__decorate([
    (0, common_1.Post)("saveppmEq"),
    __param(0, (0, common_1.Body)("ppmList")),
    __param(1, (0, common_1.Body)("ppmYear")),
    __param(2, (0, common_1.Body)("startRange")),
    __param(3, (0, common_1.Body)("endRange")),
    __param(4, (0, common_1.Body)("eqlist")),
    __param(5, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "saveppmEq", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_entity_1.Case]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __param(2, (0, common_1.Body)("case_status")),
    __param(3, (0, common_1.Body)("equipment")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, case_entity_1.Case, Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("update/sum/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __param(2, (0, common_1.Body)("case_status")),
    __param(3, (0, common_1.Body)("equipment")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, case_entity_1.Case, Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "updaten", null);
__decorate([
    (0, common_1.Post)("update2"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "update2", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("details/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "findDetail", null);
__decorate([
    (0, common_1.Post)("workorder"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "workorder", null);
__decorate([
    (0, common_1.Get)("user/worktrade/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "getAllCaseList", null);
__decorate([
    (0, common_1.Post)("uploadmulti"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], CaseController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Post)("newcase/create"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "createcase", null);
__decorate([
    (0, common_1.Get)("publish/:email"),
    __param(0, (0, common_1.Param)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "noti", null);
__decorate([
    (0, common_1.Post)("publish2/:email"),
    __param(0, (0, common_1.Param)("email")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "noti2", null);
__decorate([
    (0, common_1.Post)("upload/picture"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("picture", { storage: storage })),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CaseController.prototype, "uploadfile", null);
__decorate([
    (0, common_1.Post)("casesreport/create"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("image_file[]", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "createcases", null);
__decorate([
    (0, common_1.Get)("/download/excel"),
    (0, common_1.Header)("Content-type", "test/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "downloaddata", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "testdownloadExcelData", null);
__decorate([
    (0, common_1.Get)("generalForm"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "getFormData", null);
__decorate([
    (0, common_1.Get)("filterData"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "fitlerData", null);
__decorate([
    (0, common_1.Get)("summarycm7"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("startdate")),
    __param(2, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "summarycm7", null);
__decorate([
    (0, common_1.Get)("getdatappm3"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "getdata3", null);
__decorate([
    (0, common_1.Get)("summaryppm"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("startdate")),
    __param(2, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "summaryppm", null);
__decorate([
    (0, common_1.Get)("summarywork"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("year")),
    __param(2, (0, common_1.Query)("month")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "summary", null);
__decorate([
    (0, common_1.Get)("summaryAndEquipment3"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("startdate")),
    __param(2, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "summaryAndEquipment3", null);
__decorate([
    (0, common_1.Get)("costwk"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "costwk", null);
__decorate([
    (0, common_1.Get)("costwk4"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "costwk4", null);
__decorate([
    (0, common_1.Post)("savechecklist"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "savechecklist", null);
CaseController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("case"),
    __metadata("design:paramtypes", [case_service_1.CaseService,
        equipment_service_1.EquipmentService,
        jwt_1.JwtService,
        case_status_service_1.Case_StatusService,
        auth_service_1.AuthService,
        Case_History_service_1.CaseHistoryService,
        general_service_1.GeneralService,
        group_list_service_1.GroupListService,
        Area_service_1.AreaService,
        notification_service_1.NotificationsService,
        department_service_1.DepartmentService,
        Sub_Area_service_1.SubAreaService,
        cases_gateway_1.CasesGateway,
        Case_Type_service_1.CaseTypeService,
        asset_status_service_1.asset_statusService,
        qc_service_1.qcService,
        case_status_service_1.Case_StatusService,
        inventory_usage_service_1.Inventory_UsageService])
], CaseController);
exports.CaseController = CaseController;
//# sourceMappingURL=case.controller.js.map