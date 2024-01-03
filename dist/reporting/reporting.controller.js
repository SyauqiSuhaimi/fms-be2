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
exports.ReportingController = void 0;
const common_1 = require("@nestjs/common");
const create_reporting_dto_1 = require("./dto/create-reporting.dto");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const case_service_1 = require("../case/case.service");
const typeorm_1 = require("typeorm");
const equipment_service_1 = require("../equipment/equipment.service");
const case_entity_1 = require("../entities/case.entity");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
const user_entity_1 = require("../auth/user.entity");
const equipment_entity_1 = require("../entities/equipment.entity");
const area_entity_1 = require("../entities/area.entity");
const caseHistory_entity_1 = require("../entities/caseHistory.entity");
const caseType_entity_1 = require("../entities/caseType.entity");
const company_entity_1 = require("../entities/company.entity");
const department_entity_1 = require("../entities/department.entity");
const holiday_entity_1 = require("../entities/holiday.entity");
const serviceContract_entity_1 = require("../entities/serviceContract.entity");
const subArea_entity_1 = require("../entities/subArea.entity");
const vendor_entity_1 = require("../entities/vendor.entity");
const auth_service_1 = require("../auth/auth.service");
const news_service_1 = require("../news/news.service");
const department_service_1 = require("../department/department.service");
const worktrade_service_1 = require("../workTrade/worktrade.service");
const Eq_Brand_service_1 = require("../Eq_Brand/Eq_Brand.service");
const Eq_Type_service_1 = require("../Eq_Type/Eq_Type.service");
const Eq_Class_service_1 = require("../Eq_Class/Eq_Class.service");
const Eq_Model_service_1 = require("../Eq_Model/Eq_Model.service");
const general_service_1 = require("../helper/general.service");
const typeorm_4 = require("typeorm");
let ReportingController = class ReportingController {
    constructor(jwtService, caseService, equipmentService, AuthService, NewsService, DepartmentService, WorkTradeService, Eq_Brand, Eq_Type, Eq_Class, Eq_Model, CaseRepository, UserRepository, EquipmentRepository, AreaRepository, CaseHistoryRepository, CaseTypeRepository, CompanyRepository, DepartmentRepository, HolidayRepository, ServiceContractRepository, SubAreaRepository, VendorRepository, GeneralService, connection) {
        this.jwtService = jwtService;
        this.caseService = caseService;
        this.equipmentService = equipmentService;
        this.AuthService = AuthService;
        this.NewsService = NewsService;
        this.DepartmentService = DepartmentService;
        this.WorkTradeService = WorkTradeService;
        this.Eq_Brand = Eq_Brand;
        this.Eq_Type = Eq_Type;
        this.Eq_Class = Eq_Class;
        this.Eq_Model = Eq_Model;
        this.CaseRepository = CaseRepository;
        this.UserRepository = UserRepository;
        this.EquipmentRepository = EquipmentRepository;
        this.AreaRepository = AreaRepository;
        this.CaseHistoryRepository = CaseHistoryRepository;
        this.CaseTypeRepository = CaseTypeRepository;
        this.CompanyRepository = CompanyRepository;
        this.DepartmentRepository = DepartmentRepository;
        this.HolidayRepository = HolidayRepository;
        this.ServiceContractRepository = ServiceContractRepository;
        this.SubAreaRepository = SubAreaRepository;
        this.VendorRepository = VendorRepository;
        this.GeneralService = GeneralService;
        this.connection = connection;
    }
    async mobile_dashboard(count, request) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let response = null;
        let rules = {};
        if (data["usertype"] === "technician") {
            rules["worktrade"] = { users: { id: data["id"] } };
            rules["technician"] = { maintainer: { id: data["id"] } };
        }
        else if (data["usertype"] === "user") {
            rules["requestor"] = { id: data["id"] };
        }
        else if (data["usertype"] === "admin") {
            rules["equipment"] = { company: { id: data["companyId"] } };
        }
        rules["casetype"] = { name: (0, typeorm_1.Not)("PPM") };
        let arr1 = await this.caseService.findCase({
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
                "location.area.department",
                "equipment_type",
            ],
            order: { request_date: "DESC" },
            take: count,
        });
        let arr2 = [];
        if (data["usertype"] === "technician") {
            let rules2 = { ...rules };
            rules2["technician"] = null;
            rules2["case_status"] = { id: (0, typeorm_1.In)([2]) };
            arr2 = await this.caseService.findCase({
                where: rules2,
                relations: [
                    "equipment",
                    "case_status",
                    "equipment.subarea",
                    "casetype",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                    "location.area.department",
                    "equipment_type",
                ],
                order: { request_date: "DESC" },
                take: count,
            });
        }
        response = [...arr1, ...arr2];
        const closeCases = {
            status: [1],
            startRange: 0,
            endRange: 0,
        };
        const newCases = {
            status: [2],
            startRange: 0,
            endRange: 0,
        };
        const activeCases = {
            status: [3, 4, 5, 6],
            startRange: 0,
            endRange: 0,
        };
        const newCases2 = await this.caseService.getCaseCount(data, newCases);
        const activeCases2 = await this.caseService.getCaseCount(data, activeCases);
        const closeCases2 = await this.caseService.getCaseCount(data, closeCases);
        const news = await this.NewsService.newsByUser(data);
        const ppm2 = await this.caseService.findCase({
            where: {
                casetype: { name: "PPM" },
                requestor: { company: { user: { id: data["id"] } } },
                case_status: { id: (0, typeorm_1.In)([2, 3, 4, 5, 6, 7, 8]) },
            },
            relations: [
                "equipment",
                "case_status",
                "equipment.subarea",
                "casetype",
                "equipment.department",
            ],
            order: { request_date: "DESC" },
            take: count,
        });
        this.GeneralService.removepasswordcase(ppm2);
        this.GeneralService.removepasswordcase(response);
        return {
            ppm: ppm2,
            newCases: newCases2,
            activeCases: activeCases2,
            closeCases: closeCases2,
            news: news,
            latestCase: response,
        };
    }
    async getDashboard(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const ppm = {
            status: [2, 3, 4, 5, 6],
            startRange: 0,
            endRange: 0,
        };
        const newCases = {
            status: [2],
            startRange: 0,
            endRange: 0,
        };
        const activeCases = {
            status: [3, 4, 5, 6],
            startRange: 0,
            endRange: 0,
        };
        const closeCases = {
            status: [1],
            startRange: 0,
            endRange: 0,
        };
        const onholdCases = {
            status: [8],
            startRange: 0,
            endRange: 0,
        };
        const ppm2 = await this.caseService.getPPM(data, ppm);
        const newCases2 = await this.caseService.getCasebyCompany(data, newCases);
        const activeCases2 = await this.caseService.getCasebyCompany(data, activeCases);
        const onholdCases2 = await this.caseService.getCaseCount(data, onholdCases);
        const closeCases2 = await this.caseService.getCaseCount(data, closeCases);
        const teamMember = await this.AuthService.userCond({
            where: {
                company: { user: { id: data["id"] } },
                usertypes: { type: (0, typeorm_1.Not)("user") },
            },
            relations: ["department", "usertypes"],
        });
        const news = await this.NewsService.newsByUser(data);
        this.GeneralService.removepasswordcase(ppm2);
        this.GeneralService.removepasswordcase(newCases2);
        this.GeneralService.removepasswordcase(activeCases2);
        return {
            ppm: ppm2,
            newCases: newCases2,
            activeCases: activeCases2,
            teamMember: teamMember,
            closeCases: closeCases2,
            onholdCases: onholdCases2,
            news: news,
        };
    }
    async dashboardCompany(request, id) {
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let news = [];
        let caselist = [];
        let closeCases2 = [];
        let ppmlist = [];
        let closeppm2 = [];
        const closeCases = {
            status: [1],
            startRange: 0,
            endRange: 0,
        };
        if (data["usertype"] == "superadmin") {
            news = await this.NewsService.newsByCompany(id);
            caselist = await this.caseService.findCase({
                where: {
                    casetype: { name: (0, typeorm_1.Not)("PPM") },
                    company: { user: { id: data["id"] } },
                    case_status: { id: (0, typeorm_1.Not)([1, 9, 10]) },
                },
                relations: [
                    "equipment",
                    "case_status",
                    "casetype",
                    "equipment_type",
                    "location",
                ],
            });
            closeCases2 = await this.caseService.getCaseCount(data, closeCases);
            ppmlist = await this.caseService.findCase({
                where: {
                    casetype: { name: "PPM" },
                    requestor: { company: { user: { id: id } } },
                    case_status: { id: (0, typeorm_1.Not)([1, 9, 10]) },
                },
                relations: [
                    "equipment",
                    "case_status",
                    "casetype",
                    "equipment_type",
                    "location",
                ],
            });
            closeppm2 = await this.caseService.getCaseCount(data, closeCases);
        }
        else {
            news = await this.NewsService.newsByUser(data);
            caselist = await this.caseService.findCase({
                where: {
                    casetype: { name: (0, typeorm_1.Not)("PPM") },
                    requestor: { company: { user: { id: data["id"] } } },
                    case_status: { id: (0, typeorm_1.Not)([1, 9, 10]) },
                },
                relations: [
                    "equipment",
                    "case_status",
                    "casetype",
                    "equipment_type",
                    "location",
                ],
            });
            closeCases2 = await this.caseService.getCaseCount(data, closeCases);
            ppmlist = await this.caseService.findCase({
                where: {
                    casetype: { name: "PPM" },
                    requestor: { company: { user: { id: data["id"] } } },
                    case_status: { id: (0, typeorm_1.Not)([1, 9, 10]) },
                },
                relations: [
                    "equipment",
                    "case_status",
                    "casetype",
                    "equipment_type",
                    "location",
                ],
            });
            closeppm2 = await this.caseService.getCaseCount(data, closeCases);
        }
        this.GeneralService.removepasswordcase(caselist);
        this.GeneralService.removepasswordcase(ppmlist);
        return {
            news: news,
            caselist: caselist,
            ppmlist: ppmlist,
            closeCases: closeCases2,
            closeppm2: closeppm2,
        };
    }
    async dataForReport(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const departmentList = await this.DepartmentService.findDepartment({
            where: { company: { user: { id: data["id"] } } },
        });
        const worktradeList = await this.WorkTradeService.findMany({
            where: { company: { user: { id: data["id"] } } },
        });
        const eq_brand = await this.Eq_Brand.brandByCompany(data);
        const eq_type = await this.Eq_Type.typeByCompany(data);
        const eq_model = await this.Eq_Model.modelByCompany(data);
        const eq_class = await this.Eq_Class.classByCompany(data);
        return {
            departmentList: departmentList,
            worktradeList: worktradeList,
            eq_brand: eq_brand,
            eq_type: eq_type,
            eq_model: eq_model,
            eq_class: eq_class,
        };
    }
    filterFn(endpoint, response, condition) {
        for (const [key, value] of Object.entries(condition)) {
            console.log(key, value);
            if (value["type"] == "string") {
                console.log(value["value1"]);
                if (value["value1"] != "" && value["value1"] != null) {
                    console.log("string");
                    response = response.andWhere(`${endpoint}.${key} LIKE :inputData`, {
                        inputData: `%${value["value1"]}%`,
                    });
                }
            }
            if (value["type"] == "boolean") {
                console.log(value["value1"]);
                if (value["value1"] != "" && value["value1"] != null) {
                    console.log("boolean");
                    response = response.andWhere(`${endpoint}.${key} = :inputData`, {
                        inputData: value["value1"],
                    });
                }
            }
            if (value["type"] == "number") {
                if (value["value1"] != "" && value["value1"] != null) {
                    console.log("number", `${endpoint}.${key} `, key, value);
                    if (value["options1"] == "exact") {
                        response = response.andWhere(`${endpoint}.${key} ${value["options2"]} :inputData`, { inputData: value["value1"] });
                    }
                    if (value["options1"] == "range") {
                        if (value["options2"] == "IN") {
                            response = response.andWhere(`${endpoint}.${key} BETWEEN '${value["value1"]}' AND '${value["value2"]}'`);
                        }
                        else {
                            response = response.andWhere(`${endpoint}.${key} NOT BETWEEN '${value["value1"]}' AND '${value["value2"]}'`);
                        }
                    }
                }
            }
            if (value["type"] == "array") {
                if (value["value1"] != "" && value["value1"] != null) {
                    console.log("array", value["value1"]);
                    response = response.andWhere(`${endpoint}.${key} ${value["options1"]} (:...inputData)`, { inputData: value["value1"] });
                }
            }
            if (value["type"] == "object") {
                if (value["value1"] != "" && value["value1"] != null) {
                    console.log("object");
                    response = response.andWhere(`${endpoint}.${key} ${value["options1"]} (:inputData)`, { inputData: value["value1"]["id"] });
                }
            }
            if (value["type"] == "relations") {
                console.log("relations");
                if (value["value1"] != "" && value["value1"] != null) {
                    response = this.filterFn(`${key}`, response, value["value1"]);
                }
            }
        }
        return response;
    }
    async searchByCondition(request, post_input) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const endpoint = post_input["table"];
        let schema = this.getTableRelation(endpoint);
        const condition = post_input["where"];
        console.log("condition", condition);
        let response;
        if (schema != undefined) {
            response = await schema["repo"].createQueryBuilder(schema["table"]);
        }
        else {
            throw new common_1.BadRequestException("Table Name Not Found");
        }
        if ("calc" in condition) {
            if (post_input["calc"] == "count")
                response = response.select("COUNT(cases.id)", "count");
            if (post_input["calc"] == "sum")
                response = response.select("SUM(cases.id)", "sum");
            if (post_input["calc"] == "avg")
                response = response.select("AVG(cases.id)", "avg");
        }
        schema["relations"].forEach((rel) => {
            response = response.leftJoinAndSelect(rel["relation"], rel["label"]);
        });
        response = response.where("user.id = :id", { id: data["id"] });
        response = this.filterFn(endpoint, response, condition);
        console.log(response.getSql(), "\n\n\n sqlend");
        if (post_input["get"] == "one")
            response = response.getOne();
        if (post_input["get"] == "many")
            response = response.getMany();
        if (post_input["get"] == "rawone")
            response = response.getRawOne();
        if (post_input["get"] == "rawmany")
            response = response.getRawMany();
        if (post_input["get"] == "sql")
            response = response.getSql();
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    getTableRelation(table) {
        const entities = this.connection.entityMetadatas;
        const entityMetadata = entities.find((metadata) => {
            if (metadata.tableName == table)
                return metadata;
        });
        let tablerelation2 = {};
        const tableName = entityMetadata.tableName;
        const repository = this.connection.getRepository(entityMetadata.target);
        tablerelation2 = {
            repo: repository,
            table: tableName === "case" ? "cases" : tableName,
            relations: [],
        };
        entityMetadata.relations.forEach((rel) => {
            tablerelation2["relations"].push({
                relation: `${tablerelation2["table"]}.${rel.propertyPath}`,
                label: rel.joinColumns.length
                    ? rel.joinColumns[0].databaseName
                    : rel.propertyPath,
                condition: null,
            });
        });
        if (table === "equipment") {
            tablerelation2["relations"].push({
                relation: "companyId.user",
                label: "user",
                condition: null,
            });
        }
        console.log("tablerelation2", tablerelation2);
        const tablerelation = {
            cases: {
                repo: this.CaseRepository,
                table: "cases",
                relations: [
                    {
                        relation: "cases.equipment_type",
                        label: "equipmentTypeId",
                        condition: null,
                    },
                    { relation: "cases.equipment", label: "equipment", condition: null },
                    { relation: "cases.casetype", label: "casetype", condition: null },
                    { relation: "cases.worktrade", label: "worktrade", condition: null },
                    {
                        relation: "cases.technician",
                        label: "technician",
                        condition: null,
                    },
                    {
                        relation: "equipment.department",
                        label: "department",
                        condition: null,
                    },
                    { relation: "equipment.company", label: "company", condition: null },
                    { relation: "company.user", label: "user", condition: null },
                ],
                companyBased: true,
            },
            equipment: {
                repo: this.EquipmentRepository,
                table: "equipment",
                relations: [
                    {
                        relation: "equipment.eq_model",
                        label: "eq_model",
                        condition: null,
                    },
                    {
                        relation: "equipment.eq_brand",
                        label: "eq_brand",
                        condition: null,
                    },
                    {
                        relation: "equipment.eq_classification",
                        label: "eq_classification",
                        condition: null,
                    },
                    { relation: "equipment.eq_type", label: "eq_type", condition: null },
                    { relation: "equipment.cases", label: "cases", condition: null },
                    { relation: "equipment.subarea", label: "subarea", condition: null },
                    {
                        relation: "equipment.worktrade",
                        label: "worktrade",
                        condition: null,
                    },
                    {
                        relation: "equipment.department",
                        label: "department",
                        condition: null,
                    },
                    { relation: "equipment.company", label: "company", condition: null },
                    { relation: "company.user", label: "user", condition: null },
                ],
                companyBased: true,
            },
            user: {
                repo: this.UserRepository,
                table: "user",
                relations: [
                    { relation: "user.company", label: "company", condition: null },
                    { relation: "user.department", label: "department", condition: null },
                    { relation: "user.grouplist", label: "grouplist", condition: null },
                    { relation: "user.cases", label: "cases", condition: null },
                    { relation: "company.user", label: "user", condition: null },
                ],
                companyBased: true,
            },
            area: {
                repo: this.AreaRepository,
                table: "area",
                relations: [
                    { relation: "area.company", label: "company", condition: null },
                    { relation: "company.user", label: "user", condition: null },
                ],
                companyBased: true,
            },
            casehistory: {
                repo: this.CaseHistoryRepository,
                table: "casehistory",
                relations: [],
                companyBased: false,
            },
            casetype: {
                repo: this.CaseTypeRepository,
                table: "casetype",
                relations: [],
                companyBased: false,
            },
            company: {
                repo: this.CompanyRepository,
                table: "company",
                relations: [],
                companyBased: false,
            },
            department: {
                repo: this.DepartmentRepository,
                table: "department",
                relations: [
                    { relation: "department.company", label: "company", condition: null },
                    { relation: "company.user", label: "user", condition: null },
                ],
                companyBased: true,
            },
            holiday: {
                repo: this.HolidayRepository,
                table: "holiday",
                relations: [
                    { relation: "holiday.company", label: "company", condition: null },
                    { relation: "company.user", label: "user", condition: null },
                ],
                companyBased: true,
            },
            servicecontract: {
                repo: this.ServiceContractRepository,
                table: "servicecontract",
                relations: [
                    {
                        relation: "servicecontract.company",
                        label: "company",
                        condition: null,
                    },
                    { relation: "company.user", label: "user", condition: null },
                ],
                companyBased: true,
            },
            subarea: {
                repo: this.SubAreaRepository,
                table: "subarea",
                relations: [
                    { relation: "subarea.area", label: "area", condition: null },
                    { relation: "area.department", label: "department", condition: null },
                    { relation: "department.company", label: "company", condition: null },
                    { relation: "company.user", label: "user", condition: null },
                ],
                companyBased: true,
            },
            vendor: {
                repo: this.VendorRepository,
                table: "vendor",
                relations: [
                    { relation: "vendor.company", label: "company", condition: null },
                    { relation: "company.user", label: "user", condition: null },
                ],
                companyBased: true,
            },
        };
        return tablerelation2;
    }
    condCase(condition, response) {
        if ("departmentId" in condition) {
            if (Object.keys(condition["departmentId"]).length) {
                response = response.andWhere("department.id IN (:...departmentId)", {
                    departmentId: condition["departmentId"],
                });
            }
        }
        if ("worktradeId" in condition) {
            if (Object.keys(condition["worktradeId"]).length) {
                response = response.andWhere("worktrade.id IN (:...worktradeId)", {
                    worktradeId: condition["worktradeId"],
                });
            }
        }
        if ("caseTypeId" in condition) {
            if (Object.keys(condition["caseTypeId"]).length) {
                response = response.andWhere("casetype.id IN (:...caseTypeId)", {
                    caseTypeId: condition["caseTypeId"],
                });
            }
        }
        if ("equipmentType" in condition) {
            if (Object.keys(condition["equipmentType"]).length) {
                response = response.andWhere("equipment.type IN (:...equipmentType)", {
                    equipmentType: condition["equipmentType"],
                });
            }
        }
        if ("technician" in condition) {
            if (Object.keys(condition["technician"]).length) {
                response = response.andWhere("technician.maintainerId IN (:...technician)", { technician: condition["technician"] });
            }
        }
        if ("reqDate2" in condition) {
            if (condition["reqDate2"] != 0) {
                response = response.andWhere(`cases.request_date BETWEEN '${condition["reqDate1"]}' AND '${condition["reqDate2"]}'`);
            }
        }
        return response;
    }
    create(createReportingDto) {
        return "";
    }
    async findAll(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.caseService.findCase({
            where: { equipment: { company: { user: { id: data["id"] } } } },
        });
        return response.length;
    }
    async caseCondition(request, dataBody) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let equipment = {};
        let where = {};
        let condition = {};
        equipment.company = { user: { id: data["id"] } };
        console.log(equipment);
        if (dataBody["departmentId"] != "") {
            equipment.department = { id: (0, typeorm_1.In)(dataBody["departmentId"]) };
        }
        if (dataBody["equipmentType"] != "") {
            equipment.type = (0, typeorm_1.In)(dataBody["equipmentType"]);
        }
        if (dataBody["technician"] != "") {
            where.technician = { maintainer: { id: (0, typeorm_1.In)(dataBody["technician"]) } };
        }
        if (dataBody["worktradeId"] != "") {
            where.worktrade = { id: (0, typeorm_1.In)(dataBody["worktradeId"]) };
        }
        if (dataBody["caseTypeId"] != "") {
            where.casetype = { id: (0, typeorm_1.In)(dataBody["caseTypeId"]) };
        }
        if (dataBody["endRange"] != 0) {
            where.request_date = (0, typeorm_1.Between)(dataBody["startRange"], dataBody["endRange"]);
        }
        where.equipment = equipment;
        condition.where = where;
        const response = await this.caseService.findCase(condition);
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async equipmentCondition(request, dataBody) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let where = {};
        let condition = {};
        where.company = { user: { id: data["id"] } };
        if (dataBody["departmentId"] != "") {
            where.department = { id: (0, typeorm_1.In)(dataBody["departmentId"]) };
        }
        if (dataBody["subareaId"] != "") {
            where.subarea = { id: (0, typeorm_1.In)(dataBody["subareaId"]) };
            console.log(dataBody["subareaId"]);
        }
        if (dataBody["worktradeId"] != "") {
            where.worktrade = { id: (0, typeorm_1.In)(dataBody["worktradeId"]) };
        }
        if (dataBody["equipmentType"] != "") {
            where.type = (0, typeorm_1.In)(dataBody["equipmentType"]);
        }
        if (dataBody["purchase1"] != 0 || dataBody["purchase2"] != 0) {
            where.purchase_date = (0, typeorm_1.Between)(dataBody["purchase1"], dataBody["purchase2"]);
        }
        if (dataBody["tc1"] != 0 || dataBody["tc2"] != 0) {
            where.tc_date = (0, typeorm_1.Between)(dataBody["tc1"], dataBody["tc2"]);
        }
        condition.where = where;
        const response = await this.equipmentService.findEquipment(condition);
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async findAllbyRange(request, startRange, endRange) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.caseService.findCase({
            where: {
                equipment: { company: { user: { id: data["id"] } } },
                request_date: (0, typeorm_1.Between)(startRange, endRange),
            },
            relations: ["equipment"],
        });
        return response.length;
    }
    async userCase(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.caseService.findCase({
            where: { requestor: { id: data["id"] } },
        });
        return response;
    }
    async TechCase(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.caseService.findCase({
            where: { technician: { maintainer: { id: data["id"] } } },
        });
        return response.length;
    }
    async msqhData(request, dataBody) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        console.log("dataBody", dataBody);
        const year = Number(dataBody["year"]);
        let firstYear = new Date(year, 0, 1);
        let firstYear2 = Math.round(firstYear.getTime() / 1000);
        let nextYear = new Date(year + 1, 0, 1);
        let nextYear2 = Math.round(nextYear.getTime() / 1000);
        let response;
        if (dataBody["name"] == "workorder") {
            response = await this.caseService.findCase({
                where: {
                    casetype: { name: (0, typeorm_1.Not)("PPM") },
                    request_date: (0, typeorm_1.Between)(firstYear2, nextYear2),
                    requestor: { company: { user: { id: data["id"] } } },
                },
                relations: [
                    "worktrade",
                    "worktrade.grouplist",
                    "casehistory",
                    "equipment",
                    "case_status",
                ],
            });
        }
        else if (dataBody["name"] == "ppm") {
            response = await this.caseService.findCase({
                where: {
                    casetype: { name: "PPM" },
                    request_date: (0, typeorm_1.Between)(firstYear2, nextYear2),
                    requestor: { company: { user: { id: data["id"] } } },
                },
                relations: [
                    "worktrade",
                    "worktrade.grouplist",
                    "casehistory",
                    "equipment",
                    "case_status",
                ],
            });
        }
        else if (dataBody["name"] == "eqppm") {
            response = await this.equipmentService.findEquipment({
                where: {
                    company: { user: { id: data["id"] } },
                    cases: { casetype: { name: "PPM" } },
                },
                relations: ["worktrade.grouplist", "cases"],
            });
        }
        return response;
    }
    async detailWo(request, dataBody) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        let response;
        let rules = [];
        rules[0] = {
            casetype: { name: (0, typeorm_1.Not)("PPM") },
            requestor: { company: { user: { id: data["id"] } } },
        };
        if (dataBody["startRange"] != 0) {
            rules[0]["request_date"] = (0, typeorm_1.Between)(dataBody["startRange"], dataBody["endRange"]);
        }
        if (dataBody["status"]) {
            rules[0]["case_status"] = { id: (0, typeorm_1.In)(dataBody["status"]) };
        }
        if (dataBody["department"]) {
            rules[1] = Object.assign({}, rules[0]);
            rules[0]["equipment"] = {
                department: { id: dataBody["department"]["id"] },
            };
            rules[1]["location"] = {
                area: { department: { id: dataBody["department"]["id"] } },
            };
        }
        response = await this.caseService.findCase({
            where: rules,
            relations: [
                "equipment.subarea.area",
                "equipment.department",
                "equipment_type",
                "location.area.department",
                "case_status",
                "casetype",
                "casehistory",
            ],
        });
        return response;
    }
    async lifeExpect(request) {
        var currentDate = new Date();
        var epochTime = currentDate.getTime();
        var epochTimeInSeconds = Math.floor(epochTime / 1000);
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const res = await this.equipmentService.findEquipment({
            where: { company: { user: { id: data["id"] } } },
            relations: [
                "worktrade",
                "subarea.area",
                "department",
                "eq_type",
                "eq_classification",
                "eq_brand",
                "eq_model",
            ],
        });
        const res2 = res.map((eq) => {
            return {
                ...eq,
                life: epochTimeInSeconds - eq.purchase_date,
                total_cost: eq.cost + eq.product_cost,
            };
        });
        if (res2) {
            return res2;
        }
        else {
            throw new common_1.BadRequestException("No Data");
        }
    }
    async tableData(request, dataBody) {
        let entityJSON;
        entityJSON = this.GeneralService.mapEntityToJSON(dataBody.tableName);
        return entityJSON;
    }
};
__decorate([
    (0, common_1.Get)("mobile_dashboard"),
    __param(0, (0, common_1.Query)("count")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "mobile_dashboard", null);
__decorate([
    (0, common_1.Get)("dashboard"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)("dashboardcompany/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "dashboardCompany", null);
__decorate([
    (0, common_1.Get)("dataForReport"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "dataForReport", null);
__decorate([
    (0, common_1.Post)("condition"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "searchByCondition", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reporting_dto_1.CreateReportingDto]),
    __metadata("design:returntype", void 0)
], ReportingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("case"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("case/condition"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "caseCondition", null);
__decorate([
    (0, common_1.Post)("equipment/condition"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "equipmentCondition", null);
__decorate([
    (0, common_1.Get)("case/date/:startRange/:endRange"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("startRange")),
    __param(2, (0, common_1.Param)("endRange")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "findAllbyRange", null);
__decorate([
    (0, common_1.Get)("case/reporter"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "userCase", null);
__decorate([
    (0, common_1.Get)("case/tech"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "TechCase", null);
__decorate([
    (0, common_1.Post)("msqhData"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "msqhData", null);
__decorate([
    (0, common_1.Post)("detailWo"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "detailWo", null);
__decorate([
    (0, common_1.Get)("lifeExpect"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "lifeExpect", null);
__decorate([
    (0, common_1.Post)("tableData"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "tableData", null);
ReportingController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("reporting"),
    __param(11, (0, typeorm_2.InjectRepository)(case_entity_1.Case)),
    __param(12, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(13, (0, typeorm_2.InjectRepository)(equipment_entity_1.Equipment)),
    __param(14, (0, typeorm_2.InjectRepository)(area_entity_1.Area)),
    __param(15, (0, typeorm_2.InjectRepository)(caseHistory_entity_1.CaseHistory)),
    __param(16, (0, typeorm_2.InjectRepository)(caseType_entity_1.CaseType)),
    __param(17, (0, typeorm_2.InjectRepository)(company_entity_1.Company)),
    __param(18, (0, typeorm_2.InjectRepository)(department_entity_1.Department)),
    __param(19, (0, typeorm_2.InjectRepository)(holiday_entity_1.Holiday)),
    __param(20, (0, typeorm_2.InjectRepository)(serviceContract_entity_1.ServiceContract)),
    __param(21, (0, typeorm_2.InjectRepository)(subArea_entity_1.SubArea)),
    __param(22, (0, typeorm_2.InjectRepository)(vendor_entity_1.Vendor)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        case_service_1.CaseService,
        equipment_service_1.EquipmentService,
        auth_service_1.AuthService,
        news_service_1.NewsService,
        department_service_1.DepartmentService,
        worktrade_service_1.WorkTradeService,
        Eq_Brand_service_1.Eq_BrandService,
        Eq_Type_service_1.Eq_TypeService,
        Eq_Class_service_1.Eq_ClassService,
        Eq_Model_service_1.Eq_ModelService,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        general_service_1.GeneralService,
        typeorm_4.Connection])
], ReportingController);
exports.ReportingController = ReportingController;
//# sourceMappingURL=reporting.controller.js.map