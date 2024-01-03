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
exports.EquipmentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const equipment_service_1 = require("./equipment.service");
const equipment_entity_1 = require("../entities/equipment.entity");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const Eq_Brand_service_1 = require("../Eq_Brand/Eq_Brand.service");
const Eq_Type_service_1 = require("../Eq_Type/Eq_Type.service");
const Eq_Class_service_1 = require("../Eq_Class/Eq_Class.service");
const Eq_Model_service_1 = require("../Eq_Model/Eq_Model.service");
const group_list_service_1 = require("../Group_list/group_list.service");
const general_service_1 = require("../helper/general.service");
const department_service_1 = require("../department/department.service");
const data_1 = require("./data");
const typeorm_1 = require("typeorm");
const helper_1 = require("../helper/helper");
const vo_status_service_1 = require("../vo_status/vo_status.service");
const contract_service_1 = require("../service-contract/contract.service");
const mda_service_1 = require("../mda/mda.service");
const category_service_1 = require("../category/category.service");
const asset_group_service_1 = require("../asset_group/asset_group.service");
const equipment_status_service_1 = require("../eq_status/equipment_status.service");
const equipment_history_service_1 = require("../equipment_history/equipment_history.service");
const vendor_service_1 = require("../vendor/vendor.service");
const umdns_service_1 = require("../umdns/umdns.service");
const manufacture_service_1 = require("../manufacture/manufacture.service");
const asset_status_service_1 = require("../asset_status/asset_status.service");
const case_service_1 = require("../case/case.service");
const destinationPath = "/opt/bitnami/apache/htdocs/img/equipment";
const destinationPath2 = "/opt/bitnami/apache/htdocs/files/equipment";
const storage = helper_1.default.functions.createMulterStorage(destinationPath);
const storages2 = helper_1.default.functions.createMulterStorage(destinationPath2);
let EquipmentController = class EquipmentController {
    constructor(equipmentService, Eq_Brand, Eq_Type, Eq_Class, Eq_Model, GroupList, jwtService, GeneralService, DepartmentService, vo_statusService, contractService, mdaService, categoryservice, asset_groupservice, equipment_statusService, Equipment_HistoryService, VendorService, umdnsService, manufactureService, asset_statusService, caseService) {
        this.equipmentService = equipmentService;
        this.Eq_Brand = Eq_Brand;
        this.Eq_Type = Eq_Type;
        this.Eq_Class = Eq_Class;
        this.Eq_Model = Eq_Model;
        this.GroupList = GroupList;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
        this.DepartmentService = DepartmentService;
        this.vo_statusService = vo_statusService;
        this.contractService = contractService;
        this.mdaService = mdaService;
        this.categoryservice = categoryservice;
        this.asset_groupservice = asset_groupservice;
        this.equipment_statusService = equipment_statusService;
        this.Equipment_HistoryService = Equipment_HistoryService;
        this.VendorService = VendorService;
        this.umdnsService = umdnsService;
        this.manufactureService = manufactureService;
        this.asset_statusService = asset_statusService;
        this.caseService = caseService;
    }
    async fillAll() {
        const response = await this.equipmentService.findAll({});
        return response;
    }
    async findOne(id) {
        const response = await this.equipmentService.findOne({
            where: { id: id },
            relations: [
                "eq_type",
                "cases",
                "subarea",
                "department",
                "company",
                "cases.casetype",
                "subarea.area",
                "ppm",
                "ppm.ppmchecklist",
                "eq_classification",
                "eq_brand",
                "eq_model",
                "equipment_history",
                "tempPpm",
                "servicecontract",
                "vo_status",
                "disposal_status",
                "mda",
                "project",
            ],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async findsum(id) {
        try {
            const response = await this.equipmentService.findOne({
                where: { id: id },
                relations: [
                    "cases",
                    "subarea",
                    "worktrade",
                    "department",
                    "company",
                    "cases.casetype",
                    "subarea.area",
                    "ppm",
                    "ppm.ppmchecklist",
                    "eq_type",
                    "eq_classification",
                    "eq_brand",
                    "eq_model",
                ],
            });
            const totalCases = response.cases.length;
            const totalBreakdowns = response.cases.filter((c) => c.casetype.name === "Breakdown").length;
            const breakdownPercentage = (totalBreakdowns / totalCases) * 100;
            const latestCase = response.cases.reduce((prev, current) => {
                const prevDate = new Date(prev.end_date * 1000);
                const currDate = new Date(current.end_date * 1000);
                return prevDate > currDate ? prev : current;
            });
            const today = new Date();
            const latestCaseDate = new Date(latestCase.end_date * 1000);
            const daysSinceLatestCase = Math.floor((today.getTime() - latestCaseDate.getTime()) / (1000 * 60 * 60 * 24));
            const summary = {
                id: response.id,
                name: response.name,
                serial_number: response.serial_number,
                asset_number: response.asset_number,
                total_cases: totalCases,
                total_breakdowns: totalBreakdowns,
                breakdown_percentage: breakdownPercentage,
                latest_case: {
                    id: latestCase.id,
                    end_date: this.GeneralService.epochtodate(latestCase.end_date),
                    days_since_latest_case: Math.abs(daysSinceLatestCase) + " day",
                },
            };
            return response;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async findsum2(id) {
        try {
            const response = await this.equipmentService.findOne({
                where: { id: id },
                relations: [
                    "cases",
                    "subarea",
                    "worktrade",
                    "department",
                    "company",
                    "cases.casetype",
                    "subarea.area",
                    "ppm",
                    "ppm.ppmchecklist",
                    "eq_type",
                    "eq_classification",
                    "eq_brand",
                    "eq_model",
                ],
            });
            const numCases = response.cases.length;
            const numBreakdowns = response.cases.filter((c) => c.casetype.name === "Breakdown").length;
            const breakdownPercentage = (numBreakdowns / numCases) * 100;
            let totalCost = 0;
            let totalMaterialCost = 0;
            let totalLabourCost = 0;
            let totalVendorCost = 0;
            for (const caseItem of response.cases) {
                totalCost += caseItem.cost || 0;
                totalMaterialCost += caseItem.material_cost || 0;
                totalLabourCost += caseItem.labour_cost || 0;
                totalVendorCost += caseItem.vendor_cost || 0;
            }
            let completedCases = 0;
            let inProgressCases = 0;
            for (const caseItem of response.cases) {
                if (caseItem.end_date) {
                    completedCases++;
                }
                else {
                    inProgressCases++;
                }
            }
            let totalExpectedDuration = 0;
            let totalActualDuration = 0;
            let totalDelay = 0;
            let totalDays = 0;
            response.cases.forEach((caseItem) => {
                const expectedDuration = parseInt(String(caseItem.expected_day_taken)) || 0;
                const start_date = this.GeneralService.epochtodateonly(caseItem.request_date);
                const end_date = this.GeneralService.epochtodateonly(caseItem.action_done_time);
                const startDateObj = new Date(start_date);
                const endDateObj = new Date(end_date);
                const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
                const totalDaysForCase = isNaN(diffTime)
                    ? 0
                    : Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                console.log(totalDaysForCase, "totalDaysForCase in loop");
                const actualDuration = parseInt(String(caseItem.action_done_time)) || 0;
                const delay = actualDuration - expectedDuration;
                totalExpectedDuration += expectedDuration;
                totalActualDuration += actualDuration;
                totalDelay += delay;
                totalDays += totalDaysForCase;
            });
            console.log(totalDays, "totalDays dlm loop");
            const averageExpectedDuration = totalExpectedDuration / response.cases.length;
            const averageActualDuration = totalActualDuration / response.cases.length;
            const averageDelay = totalDelay / response.cases.length;
            const latestCase = response.cases.reduce((prev, current) => {
                const prevDate = new Date(prev.end_date * 1000);
                const currDate = new Date(current.end_date * 1000);
                return prevDate > currDate ? prev : current;
            });
            const today = new Date();
            const latestCaseDate = new Date(latestCase.end_date * 1000);
            const daysSinceLatestCase = Math.floor((today.getTime() - latestCaseDate.getTime()) / (1000 * 60 * 60 * 24));
            const caseTypePercentages = {};
            for (const caseItem of response.cases) {
                const caseTypeName = caseItem.casetype.name;
                caseTypePercentages[caseTypeName] = caseTypePercentages[caseTypeName]
                    ? caseTypePercentages[caseTypeName] + 1
                    : 1;
            }
            const summary = {
                id: response.id,
                name: response.name,
                serial_number: response.serial_number,
                asset_number: response.asset_number,
                summary: {
                    total_cases: numCases,
                    total_breakdowns: numBreakdowns,
                    breakdown_percentage: breakdownPercentage.toFixed(2),
                    completedCases: completedCases,
                    inProgressCases: inProgressCases,
                    latest_case: {
                        id: latestCase.id,
                        end_date: this.GeneralService.epochtodate(latestCase.end_date),
                        days_since_latest_case: Math.abs(daysSinceLatestCase) + " day",
                    },
                    Cost_information: {
                        Total_cost: totalCost,
                        Total_material_cost: totalMaterialCost,
                        Total_labour_cost: totalLabourCost,
                        Total_vendor_cost: totalVendorCost,
                    },
                    time_information: {
                        totalExpectedDuration: totalExpectedDuration,
                        totalDays: totalDays,
                        averageExpectedDuration: averageExpectedDuration,
                        averageActualDuration: averageActualDuration,
                        averageDelay: averageDelay,
                    },
                },
            };
            const output = `Total number of cases: ${numCases}
    

    Case types:
    ${JSON.stringify(caseTypePercentages, null, 2)}
    
    Cost information:
    Total cost: ${totalCost}
    Total material cost: ${totalMaterialCost}
    Total labour cost: ${totalLabourCost}
    Total vendor cost: ${totalVendorCost}
    
    Status:
    Total cases completed: ${completedCases} (${((completedCases / numCases) *
                100).toFixed(2)}%)
    Total cases in progress: ${inProgressCases} (${((inProgressCases / numCases) *
                100).toFixed(2)}%)
    
    Time information:
    Average expected duration of cases: ${(totalExpectedDuration / numCases).toFixed(2)} days
    Average actual duration of cases: ${(totalActualDuration / numCases).toFixed(2)} days
    Average delay of cases: ${(totalDelay / numCases).toFixed(2)} days`;
            return summary;
        }
        catch (e) {
            return "no data";
        }
    }
    async create(createEquipmentData) {
        const response = await this.equipmentService.create(createEquipmentData);
        return response;
    }
    async update(id, createEquipmentData, files) {
        const response = await this.equipmentService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            if (createEquipmentData.case) {
                await this.caseService.create(createEquipmentData.case);
                delete createEquipmentData.case;
            }
            await this.equipmentService.update(id, createEquipmentData);
            return createEquipmentData;
        }
    }
    async delete(id) {
        const response = await this.equipmentService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.equipmentService.remove(id);
            return response;
        }
    }
    async test2(cd) {
        const response = await this.equipmentService.findEquipment({ where: cd });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async getbyuser(request) {
        try {
            let cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            console.log("sini start");
            if (!data || data.userType != "admin") {
                const response = await this.equipmentService.findEquipment({
                    where: { company: { user: { id: data["id"] } } },
                    relations: [
                        "subarea.area",
                        "department.area",
                        "eq_type",
                        "eq_classification",
                        "eq_brand",
                        "eq_model",
                        "worktrade.grouplist.worktradelist",
                        "disposal_status",
                        "vo_status",
                        "eq_category",
                        "asset_group",
                        "mda",
                        "project",
                    ],
                });
                return response;
            }
            else {
                const response = await this.equipmentService.getbyuserID(data.id);
                console.log("by user");
                return response;
            }
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async getSearch(request, searchBy) {
        try {
            let cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            let cond = {};
            cond["company"] = { user: { id: data["id"] } };
            if (searchBy["asset_number"]) {
                cond["asset_number"] = (0, typeorm_1.Like)(`%${searchBy["asset_number"]}%`);
            }
            if (searchBy["name"]) {
                cond["name"] = (0, typeorm_1.Like)(`%${searchBy["name"]}%`);
            }
            if (searchBy["group"]) {
                cond["group"] = searchBy["group"];
            }
            if (searchBy["worktrade"]) {
                cond["worktrade"] = searchBy["worktrade"];
            }
            if (searchBy["eq_type"]) {
                cond["eq_type"] = searchBy["eq_type"];
            }
            if (searchBy["status"]) {
                cond["status"] = searchBy["status"];
            }
            if (searchBy["vo_status"]) {
                cond["vo_status"] = searchBy["vo_status"];
            }
            if (searchBy["area"]) {
                cond["area"] = searchBy["area"];
            }
            if (searchBy["subarea"]) {
                cond["subarea"] = searchBy["subarea"];
            }
            const response = await this.equipmentService.findEquipment({
                where: cond,
                relations: [
                    "subarea.area",
                    "department.area",
                    "eq_type",
                    "eq_classification",
                    "eq_brand",
                    "eq_model",
                    "worktrade.grouplist.worktradelist",
                    "disposal_status",
                    "vo_status",
                    "eq_category",
                    "asset_group",
                    "mda",
                    "project",
                ],
            });
            return response;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async getbyCompany(id, request) {
        try {
            let cookie = request.cookies["jwt"];
            console.log(cookie);
            const data = await this.jwtService.verifyAsync(cookie);
            if (data["usertype"] == "superadmin") {
                const response = await this.equipmentService.findEquipment({
                    where: { company: { id: id } },
                    relations: [
                        "worktrade",
                        "subarea",
                        "subarea.area",
                        "department",
                        "department.area",
                        "eq_type",
                        "eq_classification",
                        "eq_brand",
                        "eq_model",
                        "worktrade.grouplist.worktradelist",
                        "equipment_history.Equipment_Status",
                    ],
                });
                return response;
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.UnauthorizedException();
        }
    }
    async createcase(body, files) {
        let n = files.length;
        let arr = [];
        body.image_file = "";
        if (n >= 1) {
            for (let i = 0; i < n; i++) {
                arr.push(files[i].filename);
            }
            body.image_file = arr.toString();
        }
        console.log("assect/create");
        const response = await this.equipmentService.create(body);
        if (response) {
            const { status, ...responseWithoutCircularRef } = response;
            return responseWithoutCircularRef;
        }
        else {
            throw new Error("Something went wrong on the server. Please contact the administrator for assistance.");
        }
    }
    async uploadFile(body, files, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        if (files) {
            const file = files[0];
            const filename = file.filename;
        }
        const company = data.company;
        this.equipmentService.parseExcelFile(files, company);
    }
    async downloadexcel(res) {
        if (!data_1.data) {
            throw new common_1.NotFoundException("no data download");
        }
        const fileNamePrefix = "template";
        const filePath = await this.GeneralService.downloadExcelData(data_1.data, fileNamePrefix);
        res.download(filePath);
    }
    async getEqData(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const eq_brand = await this.Eq_Brand.brandByCompany(data);
        console.log("eq_brand");
        const eq_type = await this.Eq_Type.typeByCompany(data);
        console.log("eq_type");
        const eq_class = await this.Eq_Class.classByCompany(data);
        console.log("eq_class");
        const groupList = await this.GroupList.groupByCompany(data);
        console.log("groupList");
        const deptList = await this.DepartmentService.findDepartment({
            where: { company: { user: { id: data["id"] } } },
            relations: ["area", "area.subarea"],
        });
        console.log("deptList");
        const asset_statusList = await this.asset_statusService.findAll();
        console.log("asset_statusList");
        const vo_status = await this.vo_statusService.findAll();
        console.log("vo_status");
        const eq_status = await this.equipment_statusService.findAll();
        console.log("eq_status");
        const servicecontractList = await this.contractService.findMany({
            where: { company: { user: { id: data["id"] } } },
        });
        console.log("servicecontractList");
        const mdaList = await this.mdaService.findMany({
            where: { company: { user: { id: data["id"] } } },
        });
        console.log("mdaList");
        const categoryList = await this.categoryservice.find({
            where: { company: { user: { id: data["id"] } } },
        });
        console.log("categoryList");
        const asset_group = await this.asset_groupservice.find({
            where: { company: { user: { id: data["id"] } } },
        });
        console.log("asset_group");
        const supplierList = await this.VendorService.find({
            where: { company: { user: { id: data["id"] } } },
        });
        console.log("supplierList");
        const umdnsList = await this.umdnsService.find({
            where: { company: { user: { id: data["id"] } } },
        });
        console.log("umdnsList");
        const manufactureList = await this.manufactureService.find({
            where: { company: { user: { id: data["id"] } } },
        });
        console.log("manufactureList");
        return {
            eq_brand: eq_brand,
            eq_type: eq_type,
            eq_class: eq_class,
            groupList: groupList,
            deptList: deptList,
            vo_statusList: vo_status,
            servicecontractList: servicecontractList,
            mdaList: mdaList,
            categoryList: categoryList,
            asset_group: asset_group,
            eq_status: eq_status,
            supplierList: supplierList,
            umdnsList: umdnsList,
            manufactureList: manufactureList,
            asset_statusList: asset_statusList,
        };
    }
    async getEqData2(request, id) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        if (data["usertype"] == "superadmin") {
            const eq_brand = await this.Eq_Brand.findEq_Brand({
                where: { company: { id: id } },
                relations: ["eq_model"],
            });
            const eq_type = await this.Eq_Type.findEq_Type({
                where: { company: { id: id } },
            });
            const eq_class = await this.Eq_Class.findEq_Class({
                where: { company: { id: id } },
            });
            const groupList = await this.GroupList.findall({
                where: { company: { id: id } },
                relations: ["worktradelist", "worktradelist.eq_type"],
            });
            const deptList = await this.DepartmentService.findDepartment({
                where: { company: { id: id } },
                relations: ["area", "area.subarea"],
            });
            return {
                eq_brand: eq_brand,
                eq_type: eq_type,
                eq_class: eq_class,
                groupList: groupList,
                deptList: deptList,
            };
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async dataForExcel(request, bodyData) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const eqList = await this.equipmentService.findEquipment({
            where: {
                company: { user: { id: data["id"] } },
                cases: {
                    casetype: { name: "PPM" },
                    request_date: (0, typeorm_1.Between)(bodyData["firstYear"], bodyData["nextYear"]),
                },
            },
            relations: [
                "eq_type",
                "eq_classification",
                "eq_brand",
                "eq_model",
                "company",
                "department",
                "cases",
                "cases.casetype",
                "worktrade",
                "subarea",
            ],
        });
        return {
            eqList,
        };
    }
    async testprintexcel() {
        const data = await this.equipmentService.findEquipment({
            where: { cases: { id: 2 } },
            relations: [
                "eq_type",
                "eq_classification",
                "eq_brand",
                "eq_model",
                "company",
                "department",
                "servicecontract",
                "cases",
                "worktrade",
                "subarea",
                "ppm",
                "equipment_history",
                "cases.technician",
            ],
        });
        return this.GeneralService.flattenArrayOfObjects("eq", data);
    }
    async testdownloadExcelData(res, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.equipmentService.findEquipment({
            where: { company: { user: { id: data["id"] } } },
            relations: [
                "eq_type",
                "eq_classification",
                "eq_brand",
                "eq_model",
                "company",
                "department",
                "servicecontract",
                "cases",
                "worktrade",
                "subarea",
                "ppm",
                "equipment_history",
            ],
        });
        const fileNamePrefix = "Equipment";
        let columns = {
            Equipment: [
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "name",
                    format: (value) => `${value}`,
                    label: "name",
                },
                {
                    field: "serial_number",
                    format: (value) => `${value}`,
                    label: "serial_number",
                },
                {
                    field: "asset_number",
                    format: (value) => `${value}`,
                    label: "asset_number",
                },
                {
                    field: "description",
                    format: (value) => `${value}`,
                    label: "description",
                },
                {
                    field: "purchase_date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "purchase_date",
                },
                {
                    field: "tc_Date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "tc_Date",
                },
                {
                    field: "product_cost",
                    format: (value) => `${value}`,
                    label: "product_cost",
                },
                {
                    field: "accessories",
                    format: (value) => `${value}`,
                    label: "accessories",
                },
                {
                    field: "warranty",
                    format: (value) => `${value}`,
                    label: "warranty",
                },
                {
                    field: "mda",
                    format: (value) => `${value}`,
                    label: "mda",
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
                    field: "price_category",
                    format: (value) => `${value}`,
                    label: "price_category",
                },
                {
                    field: "critical",
                    format: (value) => `${value}`,
                    label: "critical",
                },
                {
                    field: "cost",
                    format: (value) => `${value}`,
                    label: "cost",
                },
                {
                    field: "eq_type_id",
                    format: (value) => `${value}`,
                    label: "eq_type_id",
                },
                {
                    field: "eq_type_name",
                    format: (value) => `${value}`,
                    label: "eq_type_name",
                },
                {
                    field: "eq_classification_id",
                    format: (value) => `${value}`,
                    label: "eq_classification_id",
                },
                {
                    field: "eq_classification_name",
                    format: (value) => `${value}`,
                    label: "eq_classification_name",
                },
                {
                    field: "eq_brand_id",
                    format: (value) => `${value}`,
                    label: "eq_brand_id",
                },
                {
                    field: "eq_brand_name",
                    format: (value) => `${value}`,
                    label: "eq_brand_name",
                },
                {
                    field: "eq_model_id",
                    format: (value) => `${value}`,
                    label: "eq_model_id",
                },
                {
                    field: "eq_model_name",
                    format: (value) => `${value}`,
                    label: "eq_model_name",
                },
                {
                    field: "company_id",
                    format: (value) => `${value}`,
                    label: "company_id",
                },
                {
                    field: "company_name",
                    format: (value) => `${value}`,
                    label: "company_name",
                },
                {
                    field: "company_status",
                    format: (value) => `${value}`,
                    label: "company_status",
                },
                {
                    field: "department_id",
                    format: (value) => `${value}`,
                    label: "department_id",
                },
                {
                    field: "department_name",
                    format: (value) => `${value}`,
                    label: "department_name",
                },
                {
                    field: "department_type",
                    format: (value) => `${value}`,
                    label: "department_type",
                },
                {
                    field: "servicecontract",
                    format: (value) => `${value ? value : ""}`,
                    label: "servicecontract",
                },
                {
                    field: "worktrade_id",
                    format: (value) => `${value}`,
                    label: "worktrade_id",
                },
                {
                    field: "worktrade_name",
                    format: (value) => `${value}`,
                    label: "worktrade_name",
                },
                {
                    field: "subarea_id",
                    format: (value) => `${value}`,
                    label: "subarea_id",
                },
                {
                    field: "subarea_name",
                    format: (value) => `${value}`,
                    label: "subarea_name",
                },
            ],
            cases: [
                {
                    field: "Equipment_id",
                    format: (value) => `${value}`,
                    label: "Equipment_id",
                },
                {
                    field: "Equipment_name",
                    format: (value) => `${value}`,
                    label: "Equipment_name",
                },
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
                    format: (value) => `${value ? value : ""}`,
                    label: "contact_name",
                },
                {
                    field: "mobile_no",
                    format: (value) => `${value ? value : ""}`,
                    label: "mobile_no",
                },
                {
                    field: "cost",
                    format: (value) => `${value ? value : ""}`,
                    label: "cost",
                },
                {
                    field: "description",
                    format: (value) => `${value ? value : ""}`,
                    label: "description",
                },
                {
                    field: "image_file",
                    format: (value) => `${value ? value : ""}`,
                    label: "image_file",
                },
                {
                    field: "expected_day_taken",
                    format: (value) => `${value ? value : "0"}`,
                    label: "expected_day_taken",
                },
                {
                    field: "end_date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "end_date",
                },
            ],
            ppm: [
                {
                    field: "Equipment_id",
                    format: (value) => `${value}`,
                    label: "Equipment_id",
                },
                {
                    field: "Equipment_name",
                    format: (value) => `${value}`,
                    label: "Equipment_name",
                },
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "name",
                    format: (value) => `${value ? value : ""}`,
                    label: "name",
                },
                {
                    field: "description",
                    format: (value) => `${value ? value : ""}`,
                    label: "description",
                },
                {
                    field: "interval",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "interval",
                },
                {
                    field: "onholiday",
                    format: (value) => `${value}`,
                    label: "onholiday",
                },
                {
                    field: "task",
                    format: (value) => `${value ? value : ""}`,
                    label: "task",
                },
                {
                    field: "start_date",
                    format: (value) => `${value ? value : ""}`,
                    label: "start_date",
                },
                {
                    field: "priority",
                    format: (value) => `${value}`,
                    label: "priority",
                },
                {
                    field: "replaceable",
                    format: (value) => `${value}`,
                    label: "replaceable",
                },
                {
                    field: "expected_duration",
                    format: (value) => `${value}`,
                    label: "expected_duration",
                },
                {
                    field: "precision",
                    format: (value) => `${value}`,
                    label: "precision",
                },
            ],
            equipment_history: [
                {
                    field: "Equipment_id",
                    format: (value) => `${value}`,
                    label: "Equipment_id",
                },
                {
                    field: "Equipment_name",
                    format: (value) => `${value}`,
                    label: "Equipment_name",
                },
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "eqhistory_name",
                    format: (value) => `${value ? value : ""}`,
                    label: "eqhistory_name",
                },
                {
                    field: "time",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "time",
                },
            ],
        };
        const filePath = await this.GeneralService.downloadExcelData(this.GeneralService.flattenArrayOfObjects(fileNamePrefix, response), fileNamePrefix, columns, true);
        res.download(filePath);
    }
    async downloadPpm(res, request, ppmYear) {
        if (typeof ppmYear === "string") {
            ppmYear = parseInt(ppmYear);
            console.log("Str", ppmYear);
        }
        const cookie = request.cookies["jwt"];
        const userData = await this.jwtService.verifyAsync(cookie);
        let firstYear = new Date(ppmYear, 0, 1);
        let firstYear2 = Math.round(firstYear.getTime() / 1000);
        let nextYear = new Date(ppmYear + 1, 0, 1);
        let nextYear2 = Math.round(nextYear.getTime() / 1000);
        const data = await this.equipmentService.findEquipment({
            where: {
                company: { user: { id: userData["id"] } },
                cases: {
                    casetype: { name: "PPM" },
                    request_date: (0, typeorm_1.Between)(firstYear2, nextYear2),
                },
            },
            relations: [
                "eq_type",
                "eq_classification",
                "eq_brand",
                "eq_model",
                "company",
                "department",
                "servicecontract",
                "cases",
                "worktrade",
                "subarea",
                "cases.ppm",
                "ppm.ppmchecklist",
            ],
        });
        const fileNamePrefix = "Equipment";
        let columns = {
            Equipment: [
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "name",
                    format: (value) => `${value}`,
                    label: "name",
                },
                {
                    field: "serial_number",
                    format: (value) => `${value}`,
                    label: "serial_number",
                },
                {
                    field: "asset_number",
                    format: (value) => `${value}`,
                    label: "asset_number",
                },
                {
                    field: "description",
                    format: (value) => `${value}`,
                    label: "description",
                },
                {
                    field: "purchase_date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "purchase_date",
                },
                {
                    field: "tc_Date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "tc_Date",
                },
                {
                    field: "product_cost",
                    format: (value) => `${value}`,
                    label: "product_cost",
                },
                {
                    field: "accessories",
                    format: (value) => `${value}`,
                    label: "accessories",
                },
                {
                    field: "warranty",
                    format: (value) => `${value}`,
                    label: "warranty",
                },
                {
                    field: "mda",
                    format: (value) => `${value}`,
                    label: "mda",
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
                    field: "price_category",
                    format: (value) => `${value}`,
                    label: "price_category",
                },
                {
                    field: "critical",
                    format: (value) => `${value}`,
                    label: "critical",
                },
                {
                    field: "cost",
                    format: (value) => `${value}`,
                    label: "cost",
                },
                {
                    field: "eq_type_id",
                    format: (value) => `${value}`,
                    label: "eq_type_id",
                },
                {
                    field: "eq_type_name",
                    format: (value) => `${value}`,
                    label: "eq_type_name",
                },
                {
                    field: "eq_classification_id",
                    format: (value) => `${value}`,
                    label: "eq_classification_id",
                },
                {
                    field: "eq_classification_name",
                    format: (value) => `${value}`,
                    label: "eq_classification_name",
                },
                {
                    field: "eq_brand_id",
                    format: (value) => `${value}`,
                    label: "eq_brand_id",
                },
                {
                    field: "eq_brand_name",
                    format: (value) => `${value}`,
                    label: "eq_brand_name",
                },
                {
                    field: "eq_model_id",
                    format: (value) => `${value}`,
                    label: "eq_model_id",
                },
                {
                    field: "eq_model_name",
                    format: (value) => `${value}`,
                    label: "eq_model_name",
                },
                {
                    field: "company_id",
                    format: (value) => `${value}`,
                    label: "company_id",
                },
                {
                    field: "company_name",
                    format: (value) => `${value}`,
                    label: "company_name",
                },
                {
                    field: "company_status",
                    format: (value) => `${value}`,
                    label: "company_status",
                },
                {
                    field: "department_id",
                    format: (value) => `${value}`,
                    label: "department_id",
                },
                {
                    field: "department_name",
                    format: (value) => `${value}`,
                    label: "department_name",
                },
                {
                    field: "department_type",
                    format: (value) => `${value}`,
                    label: "department_type",
                },
                {
                    field: "servicecontract",
                    format: (value) => `${value ? value : ""}`,
                    label: "servicecontract",
                },
                {
                    field: "worktrade_id",
                    format: (value) => `${value}`,
                    label: "worktrade_id",
                },
                {
                    field: "worktrade_name",
                    format: (value) => `${value}`,
                    label: "worktrade_name",
                },
                {
                    field: "subarea_id",
                    format: (value) => `${value}`,
                    label: "subarea_id",
                },
                {
                    field: "subarea_name",
                    format: (value) => `${value}`,
                    label: "subarea_name",
                },
            ],
            cases: [
                {
                    field: "Equipment_id",
                    format: (value) => `${value}`,
                    label: "Equipment_id",
                },
                {
                    field: "Equipment_name",
                    format: (value) => `${value}`,
                    label: "Equipment_name",
                },
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "request_date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "PPM Date",
                },
                {
                    field: "contact_name",
                    format: (value) => `${value ? value : ""}`,
                    label: "contact_name",
                },
                {
                    field: "mobile_no",
                    format: (value) => `${value ? value : ""}`,
                    label: "mobile_no",
                },
                {
                    field: "description",
                    format: (value) => `${value ? value : ""}`,
                    label: "description",
                },
                {
                    field: "expected_day_taken",
                    format: (value) => `${value ? value : "0"}`,
                    label: "expected_day_taken",
                },
                {
                    field: "end_date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "end_date",
                },
                {
                    field: "ppm_id",
                    format: (value) => `${value}`,
                    label: "ppm_id",
                },
            ],
            ppm: [
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "name",
                    format: (value) => `${value}`,
                    label: "name",
                },
                {
                    field: "interval",
                    format: (value) => `${this.GeneralService.getIntervalDesc(value)}`,
                    label: "interval",
                },
                {
                    field: "precision",
                    format: (value) => `${value}`,
                    label: "precision",
                },
                {
                    field: "expected_duration",
                    format: (value) => `${value}`,
                    label: "expected_duration",
                },
                {
                    field: "ppmchecklist_path",
                    format: (value) => `https://www.myces-fms.com/files/ppmChecklist/${value}`,
                    label: "checklist",
                },
            ],
        };
        const filePath = await this.GeneralService.downloadExcelData(this.GeneralService.flattenArrayOfObjects(fileNamePrefix, data), fileNamePrefix, columns, true);
        console.log("xde file path");
        res.download(filePath);
    }
    async downloadTempPpm(res, request, ppmYear) {
        if (typeof ppmYear === "string") {
            ppmYear = parseInt(ppmYear);
            console.log("Str", ppmYear);
        }
        const cookie = request.cookies["jwt"];
        const userData = await this.jwtService.verifyAsync(cookie);
        let firstYear = new Date(ppmYear, 0, 1);
        let firstYear2 = Math.round(firstYear.getTime() / 1000);
        let nextYear = new Date(ppmYear + 1, 0, 1);
        let nextYear2 = Math.round(nextYear.getTime() / 1000);
        const data = await this.equipmentService.findEquipment({
            where: {
                company: { user: { id: userData["id"] } },
                cases: {
                    casetype: { name: "PPM" },
                    request_date: (0, typeorm_1.Between)(firstYear2, nextYear2),
                },
            },
            relations: [
                "eq_type",
                "eq_classification",
                "eq_brand",
                "eq_model",
                "company",
                "department",
                "servicecontract",
                "tempppm",
                "worktrade",
                "subarea",
                "tempppm.ppm",
                "ppm.ppmchecklist",
            ],
        });
        const fileNamePrefix = "Equipment";
        let columns = {
            Equipment: [
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "name",
                    format: (value) => `${value}`,
                    label: "name",
                },
                {
                    field: "serial_number",
                    format: (value) => `${value}`,
                    label: "serial_number",
                },
                {
                    field: "asset_number",
                    format: (value) => `${value}`,
                    label: "asset_number",
                },
                {
                    field: "description",
                    format: (value) => `${value}`,
                    label: "description",
                },
                {
                    field: "purchase_date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "purchase_date",
                },
                {
                    field: "tc_Date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "tc_Date",
                },
                {
                    field: "product_cost",
                    format: (value) => `${value}`,
                    label: "product_cost",
                },
                {
                    field: "accessories",
                    format: (value) => `${value}`,
                    label: "accessories",
                },
                {
                    field: "warranty",
                    format: (value) => `${value}`,
                    label: "warranty",
                },
                {
                    field: "mda",
                    format: (value) => `${value}`,
                    label: "mda",
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
                    field: "price_category",
                    format: (value) => `${value}`,
                    label: "price_category",
                },
                {
                    field: "critical",
                    format: (value) => `${value}`,
                    label: "critical",
                },
                {
                    field: "cost",
                    format: (value) => `${value}`,
                    label: "cost",
                },
                {
                    field: "eq_type_id",
                    format: (value) => `${value}`,
                    label: "eq_type_id",
                },
                {
                    field: "eq_type_name",
                    format: (value) => `${value}`,
                    label: "eq_type_name",
                },
                {
                    field: "eq_classification_id",
                    format: (value) => `${value}`,
                    label: "eq_classification_id",
                },
                {
                    field: "eq_classification_name",
                    format: (value) => `${value}`,
                    label: "eq_classification_name",
                },
                {
                    field: "eq_brand_id",
                    format: (value) => `${value}`,
                    label: "eq_brand_id",
                },
                {
                    field: "eq_brand_name",
                    format: (value) => `${value}`,
                    label: "eq_brand_name",
                },
                {
                    field: "eq_model_id",
                    format: (value) => `${value}`,
                    label: "eq_model_id",
                },
                {
                    field: "eq_model_name",
                    format: (value) => `${value}`,
                    label: "eq_model_name",
                },
                {
                    field: "company_id",
                    format: (value) => `${value}`,
                    label: "company_id",
                },
                {
                    field: "company_name",
                    format: (value) => `${value}`,
                    label: "company_name",
                },
                {
                    field: "company_status",
                    format: (value) => `${value}`,
                    label: "company_status",
                },
                {
                    field: "department_id",
                    format: (value) => `${value}`,
                    label: "department_id",
                },
                {
                    field: "department_name",
                    format: (value) => `${value}`,
                    label: "department_name",
                },
                {
                    field: "department_type",
                    format: (value) => `${value}`,
                    label: "department_type",
                },
                {
                    field: "servicecontract",
                    format: (value) => `${value ? value : ""}`,
                    label: "servicecontract",
                },
                {
                    field: "worktrade_id",
                    format: (value) => `${value}`,
                    label: "worktrade_id",
                },
                {
                    field: "worktrade_name",
                    format: (value) => `${value}`,
                    label: "worktrade_name",
                },
                {
                    field: "subarea_id",
                    format: (value) => `${value}`,
                    label: "subarea_id",
                },
                {
                    field: "subarea_name",
                    format: (value) => `${value}`,
                    label: "subarea_name",
                },
            ],
            tempppm: [
                {
                    field: "Equipment_id",
                    format: (value) => `${value}`,
                    label: "Equipment_id",
                },
                {
                    field: "Equipment_name",
                    format: (value) => `${value}`,
                    label: "Equipment_name",
                },
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "request_date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "PPM Date",
                },
                {
                    field: "contact_name",
                    format: (value) => `${value ? value : ""}`,
                    label: "contact_name",
                },
                {
                    field: "mobile_no",
                    format: (value) => `${value ? value : ""}`,
                    label: "mobile_no",
                },
                {
                    field: "description",
                    format: (value) => `${value ? value : ""}`,
                    label: "description",
                },
                {
                    field: "expected_day_taken",
                    format: (value) => `${value ? value : "0"}`,
                    label: "expected_day_taken",
                },
                {
                    field: "end_date",
                    format: (value) => `${this.GeneralService.epochtodate(value)}`,
                    label: "end_date",
                },
                {
                    field: "ppm_id",
                    format: (value) => `${value}`,
                    label: "ppm_id",
                },
            ],
            ppm: [
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "name",
                    format: (value) => `${value}`,
                    label: "name",
                },
                {
                    field: "interval",
                    format: (value) => `${this.GeneralService.getIntervalDesc(value)}`,
                    label: "interval",
                },
                {
                    field: "precision",
                    format: (value) => `${value}`,
                    label: "precision",
                },
                {
                    field: "expected_duration",
                    format: (value) => `${value}`,
                    label: "expected_duration",
                },
                {
                    field: "ppmchecklist_path",
                    format: (value) => `https://www.myces-fms.com/files/ppmChecklist/${value}`,
                    label: "Checklist",
                },
            ],
        };
        const filePath = await this.GeneralService.downloadExcelData(this.GeneralService.flattenArrayOfObjects(fileNamePrefix, data), fileNamePrefix, columns, true);
        res.download(filePath);
    }
    async datamana(request, startdate, enddate) {
        const cookie = request.cookies["jwt"];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const data = await this.equipmentService.findEquipment({
            equipment: {
                company: {
                    id: dataj["id"],
                },
                equipment_history: { time: (0, typeorm_1.Between)(startdate, enddate) },
            },
            relations: [
                "department",
                "company",
                "equipment_history",
                "equipment_history.Equipment_Status",
            ],
        });
        return data;
    }
    getMonthName(monthNumber) {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return months[monthNumber];
    }
    async equipmentsummarytest3(request, startdate, enddate) {
        const cookie = request.cookies["jwt"];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const data = await this.equipmentService.findEquipment({
            where: {
                company: {
                    id: dataj["id"],
                },
                equipment_history: {
                    time: (0, typeorm_1.Between)(startdate, enddate),
                },
            },
            relations: [
                "department",
                "company",
                "equipment_history",
                "equipment_history.Equipment_Status",
            ],
            order: {
                equipment_history: { time: "DESC" },
            },
        });
        const entriesByDepartment = new Map();
        data.forEach((entry) => {
            const departmentName = entry.department.name;
            if (!entriesByDepartment.has(departmentName)) {
                entriesByDepartment.set(departmentName, []);
            }
            entriesByDepartment.get(departmentName).push(entry);
        });
        const report = [];
        let totalAssets = 0;
        let totalActive = 0;
        let totalInactive = 0;
        let totalCondemn = 0;
        entriesByDepartment.forEach((entries, departmentName) => {
            const departmentReport = {
                Site: dataj.company.name,
                Department: departmentName,
                "Total Asset": entries.length,
                Active: 0,
                "In Active": 0,
                Condemned: 0,
            };
            entries.forEach((entry) => {
                const equipmentStatus = entry.equipment_history[0].Equipment_Status.id;
                if (equipmentStatus === 1) {
                    departmentReport.Active++;
                }
                else if (equipmentStatus === 2) {
                    departmentReport["In Active"]++;
                }
                else if (equipmentStatus === 3) {
                    departmentReport.Condemned++;
                }
            });
            report.push(departmentReport);
            totalAssets += entries.length;
            totalActive += departmentReport.Active;
            totalInactive += departmentReport["In Active"];
            totalCondemn += departmentReport.Condemned;
        });
        const totalReport = {
            site: dataj.company.name,
            month: "",
            totalAsset: totalAssets,
            active: totalActive,
            inactive: totalInactive,
            condemn: totalCondemn,
        };
        return {
            totalReport,
            report,
        };
    }
    async equipmentsummarytest4(request, startdate, enddate) {
        const cookie = request.cookies["jwt"];
        const dataj = await this.jwtService.verifyAsync(cookie);
        const data = await this.equipmentService.findEquipment({
            where: {
                company: {
                    user: {
                        id: dataj["id"],
                    },
                },
                equipment_history: {
                    time: (0, typeorm_1.Between)(startdate, enddate),
                },
            },
            relations: [
                "department",
                "company",
                "equipment_history",
                "equipment_history.Equipment_Status",
            ],
            order: {
                equipment_history: { time: "DESC" },
            },
        });
        const entriesByDepartment = new Map();
        const monthMap = {
            "01": "January",
            "02": "February",
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            "10": "October",
            "11": "November",
            "12": "December",
        };
        data.forEach((entry) => {
            const departmentName = entry.department.name;
            if (!entriesByDepartment.has(departmentName)) {
                entriesByDepartment.set(departmentName, []);
            }
            entriesByDepartment.get(departmentName).push(entry);
        });
        const report = [];
        let totalAssets = 0;
        let totalActive = 0;
        let totalInactive = 0;
        let totalCondemn = 0;
        entriesByDepartment.forEach((entries, departmentName) => {
            const departmentReport = {
                Site: dataj.company.name,
                Department: departmentName,
                "Total Asset": entries.length,
                Active: 0,
                "In Active": 0,
                Condemned: 0,
            };
            entries.forEach((entry) => {
                const equipmentStatus = entry.equipment_history[0].Equipment_Status.id;
                if (equipmentStatus === 1) {
                    departmentReport.Active++;
                }
                else if (equipmentStatus === 2) {
                    departmentReport["In Active"]++;
                }
                else if (equipmentStatus === 3) {
                    departmentReport.Condemned++;
                }
            });
            report.push(departmentReport);
            totalAssets += entries.length;
            totalActive += departmentReport.Active;
            totalInactive += departmentReport["In Active"];
            totalCondemn += departmentReport.Condemned;
        });
        const startDateObj = new Date(startdate * 1000);
        const month = (startDateObj.getMonth() + 1).toString().padStart(2, "0");
        const monthName = monthMap[month];
        const totalReport = {
            site: dataj.company.name,
            month: monthName,
            totalAsset: totalAssets,
            active: totalActive,
            inactive: totalInactive,
            condemn: totalCondemn,
        };
        return {
            totalReport,
            report,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "fillAll", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("id/:id/true"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "findsum", null);
__decorate([
    (0, common_1.Get)("id/:id/sum"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "findsum2", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [equipment_entity_1.Equipment]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 10, { storage: storage })),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Array]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("test"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "test2", null);
__decorate([
    (0, common_1.Get)("users"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "getbyuser", null);
__decorate([
    (0, common_1.Post)("search"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "getSearch", null);
__decorate([
    (0, common_1.Get)("company/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "getbyCompany", null);
__decorate([
    (0, common_1.Post)("newAsset/create"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "createcase", null);
__decorate([
    (0, common_1.Post)("/asset/excel"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storages2 })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)("/template/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "downloadexcel", null);
__decorate([
    (0, common_1.Get)("/geteqdata"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "getEqData", null);
__decorate([
    (0, common_1.Get)("/geteqdata/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "getEqData2", null);
__decorate([
    (0, common_1.Post)("/dataForExcel"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "dataForExcel", null);
__decorate([
    (0, common_1.Get)("/test/json"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "testprintexcel", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "testdownloadExcelData", null);
__decorate([
    (0, common_1.Post)("/download/ppm"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)("ppmYear")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "downloadPpm", null);
__decorate([
    (0, common_1.Post)("/download/tempppm"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)("ppmYear")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "downloadTempPpm", null);
__decorate([
    (0, common_1.Get)("getdata2"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("startdate")),
    __param(2, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "datamana", null);
__decorate([
    (0, common_1.Get)("equipmentsummarytest3"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("startdate")),
    __param(2, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "equipmentsummarytest3", null);
__decorate([
    (0, common_1.Get)("equipmentsummarytest4"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("startdate")),
    __param(2, (0, common_1.Query)("enddate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "equipmentsummarytest4", null);
EquipmentController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("equipment"),
    __metadata("design:paramtypes", [equipment_service_1.EquipmentService,
        Eq_Brand_service_1.Eq_BrandService,
        Eq_Type_service_1.Eq_TypeService,
        Eq_Class_service_1.Eq_ClassService,
        Eq_Model_service_1.Eq_ModelService,
        group_list_service_1.GroupListService,
        jwt_1.JwtService,
        general_service_1.GeneralService,
        department_service_1.DepartmentService,
        vo_status_service_1.vo_statusService,
        contract_service_1.ContractService,
        mda_service_1.mdaService,
        category_service_1.categoryService,
        asset_group_service_1.asset_groupService,
        equipment_status_service_1.equipment_statusService,
        equipment_history_service_1.Equipment_HistoryService,
        vendor_service_1.VendorService,
        umdns_service_1.umdnsService,
        manufacture_service_1.manufactureService,
        asset_status_service_1.asset_statusService,
        case_service_1.CaseService])
], EquipmentController);
exports.EquipmentController = EquipmentController;
//# sourceMappingURL=equipment.controller.js.map