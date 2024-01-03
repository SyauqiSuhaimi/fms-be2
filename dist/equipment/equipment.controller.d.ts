/// <reference types="multer" />
import { Response, Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { EquipmentService } from "./equipment.service";
import { Equipment } from "../entities/equipment.entity";
import { Eq_BrandService } from "../Eq_Brand/Eq_Brand.service";
import { Eq_TypeService } from "../Eq_Type/Eq_Type.service";
import { Eq_ClassService } from "../Eq_Class/Eq_Class.service";
import { Eq_ModelService } from "../Eq_Model/Eq_Model.service";
import { GroupListService } from "../Group_list/group_list.service";
import { GeneralService } from "../helper/general.service";
import { DepartmentService } from "../department/department.service";
import { vo_statusService } from "../vo_status/vo_status.service";
import { ContractService } from "../service-contract/contract.service";
import { mdaService } from "../mda/mda.service";
import { categoryService } from "../category/category.service";
import { asset_groupService } from "../asset_group/asset_group.service";
import { equipment_statusService } from "../eq_status/equipment_status.service";
import { Equipment_HistoryService } from "../equipment_history/equipment_history.service";
import { VendorService } from "../vendor/vendor.service";
import { umdnsService } from "../umdns/umdns.service";
import { manufactureService } from "../manufacture/manufacture.service";
import { asset_statusService } from "../asset_status/asset_status.service";
import { CaseService } from "../case/case.service";
export declare class EquipmentController {
    private equipmentService;
    private Eq_Brand;
    private Eq_Type;
    private Eq_Class;
    private Eq_Model;
    private readonly GroupList;
    private jwtService;
    private GeneralService;
    private DepartmentService;
    private vo_statusService;
    private contractService;
    private mdaService;
    private categoryservice;
    private asset_groupservice;
    private equipment_statusService;
    private Equipment_HistoryService;
    private VendorService;
    private umdnsService;
    private manufactureService;
    private asset_statusService;
    private caseService;
    constructor(equipmentService: EquipmentService, Eq_Brand: Eq_BrandService, Eq_Type: Eq_TypeService, Eq_Class: Eq_ClassService, Eq_Model: Eq_ModelService, GroupList: GroupListService, jwtService: JwtService, GeneralService: GeneralService, DepartmentService: DepartmentService, vo_statusService: vo_statusService, contractService: ContractService, mdaService: mdaService, categoryservice: categoryService, asset_groupservice: asset_groupService, equipment_statusService: equipment_statusService, Equipment_HistoryService: Equipment_HistoryService, VendorService: VendorService, umdnsService: umdnsService, manufactureService: manufactureService, asset_statusService: asset_statusService, caseService: CaseService);
    fillAll(): Promise<Equipment[]>;
    findOne(id: number): Promise<Equipment>;
    findsum(id: number): Promise<Equipment>;
    findsum2(id: number): Promise<{
        id: number;
        name: string;
        serial_number: string;
        asset_number: string;
        summary: {
            total_cases: number;
            total_breakdowns: number;
            breakdown_percentage: string;
            completedCases: number;
            inProgressCases: number;
            latest_case: {
                id: number;
                end_date: string;
                days_since_latest_case: string;
            };
            Cost_information: {
                Total_cost: number;
                Total_material_cost: number;
                Total_labour_cost: number;
                Total_vendor_cost: number;
            };
            time_information: {
                totalExpectedDuration: number;
                totalDays: number;
                averageExpectedDuration: number;
                averageActualDuration: number;
                averageDelay: number;
            };
        };
    } | "no data">;
    create(createEquipmentData: Equipment): Promise<Equipment>;
    update(id: number, createEquipmentData: any, files: Array<Express.Multer.File>): Promise<any>;
    delete(id: number): Promise<any>;
    test2(cd: any): Promise<Equipment[]>;
    getbyuser(request: Request): Promise<any>;
    getSearch(request: Request, searchBy: any): Promise<Equipment[]>;
    getbyCompany(id: number, request: Request): Promise<Equipment[]>;
    createcase(body: any, files: Array<Express.Multer.File>): Promise<{
        id: number;
        name: string;
        serial_number: string;
        asset_number: string;
        sjsb_no: string;
        eq_type: import("../entities/eq_type.entity").Eq_Type;
        description: string;
        eq_classification: import("../entities/eq_classification.entity").Eq_Classifications;
        eq_brand: import("../entities/eq_brand.entity").Eq_Brand;
        eq_model: import("../entities/eq_model.entity").Eq_Model;
        purchase_date: number;
        tc_Date: number;
        product_cost: number;
        accessories: string;
        warranty: number;
        lifespan: number;
        image_file: string;
        price_category: string;
        critical: boolean;
        cost: number;
        company: import("../entities/company.entity").Company;
        department: import("../entities/department.entity").Department;
        servicecontract: import("../entities/serviceContract.entity").ServiceContract[];
        cases: import("../entities/case.entity").Case[];
        worktrade: import("../entities/workTrade.entity").WorkTrade;
        subarea: import("../entities/subArea.entity").SubArea;
        ppm: import("../entities/ppm.entity").PPM[];
        tempPpm: import("../entities/tempppm.entity").tempPpm[];
        asset_type_code: string;
        barcode_image: string;
        eq_category: import("../entities/category.entity").Category;
        category_critical: import("../entities/category_critical.entity").Category_critical;
        category_cost: import("../entities/category_cost.entity").Category_cost;
        manufacture: import("../entities/manufacture.entity").manufacture;
        maker: string;
        registration_no: string;
        chassis_no: string;
        engine_no: string;
        engine_capacity: string;
        fuel_type: string;
        current_meter_reading: string;
        manufacturing_date: number;
        software_version_key: string;
        power_specification: string;
        volt: string;
        project: import("../entities/project.entity").project;
        disposal_status: import("../entities/disposal_status.entity").disposal_status;
        mda: import("../entities/mda.entity").mda;
        asset_status: import("../entities/asset_status.entity").Asset_Status;
        defect: import("../entities/defect.entity").defect[];
        routine: boolean;
        calibration: boolean;
        maintenance_category: string;
        nominated_contractor: boolean;
        last_work_order_no: string;
        last_service_work_no: string;
        last_work_date: number;
        last_service_date: number;
        eq_matric: import("../entities/eq_matric.entity").eq_matric[];
        warranty_start: number;
        warranty_end: number;
        age: number;
        year_service: number;
        commision_date: number;
        asset_group: import("../entities/asset_group.entity").asset_group;
        equipment_history: import("../entities/equipment_history.entity").Equipment_History[];
        vo_status: import("../entities/vo_status.entity").vo_status;
        effective_date: number;
        service_start_date: number;
        spata_code: string;
        spata_desc: string;
        specification: string;
        power_specification_watt: string;
        power_specification_ampere: string;
        vo_remark: string;
        purchase_category: string;
        main_supplier: import("../entities/vendor.entity").Vendor;
        umdns: import("../entities/umdns.entity").umdns;
        jkpp_no: string;
        resourse_type: string;
        maintanance_work: boolean;
        labour_cost: number;
        vendor_cost: number;
        material_cost: number;
    }>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
    downloadexcel(res: Response): Promise<void>;
    getEqData(request: Request): Promise<{
        eq_brand: import("../entities/eq_brand.entity").Eq_Brand[];
        eq_type: import("../entities/eq_type.entity").Eq_Type[];
        eq_class: import("../entities/eq_classification.entity").Eq_Classifications[];
        groupList: import("../entities/groupList.entity").GroupList[];
        deptList: import("../entities/department.entity").Department[];
        vo_statusList: import("../entities/vo_status.entity").vo_status[];
        servicecontractList: import("../entities/serviceContract.entity").ServiceContract[];
        mdaList: import("../entities/mda.entity").mda[];
        categoryList: import("../entities/category.entity").Category[];
        asset_group: import("../entities/asset_group.entity").asset_group[];
        eq_status: import("../entities/equipment_status.entity").Equipment_Status[];
        supplierList: import("../entities/vendor.entity").Vendor[];
        umdnsList: import("../entities/umdns.entity").umdns[];
        manufactureList: import("../entities/manufacture.entity").manufacture[];
        asset_statusList: import("../entities/asset_status.entity").Asset_Status[];
    }>;
    getEqData2(request: Request, id: number): Promise<{
        eq_brand: import("../entities/eq_brand.entity").Eq_Brand[];
        eq_type: import("../entities/eq_type.entity").Eq_Type[];
        eq_class: import("../entities/eq_classification.entity").Eq_Classifications[];
        groupList: import("../entities/groupList.entity").GroupList[];
        deptList: import("../entities/department.entity").Department[];
    }>;
    dataForExcel(request: Request, bodyData: any): Promise<{
        eqList: Equipment[];
    }>;
    testprintexcel(): Promise<{}>;
    testdownloadExcelData(res: Response, request: Request): Promise<void>;
    downloadPpm(res: Response, request: Request, ppmYear: number): Promise<void>;
    downloadTempPpm(res: Response, request: Request, ppmYear: number): Promise<void>;
    datamana(request: Request, startdate: number, enddate: number): Promise<Equipment[]>;
    getMonthName(monthNumber: any): string;
    equipmentsummarytest3(request: Request, startdate: number, enddate: number): Promise<{
        totalReport: {
            site: any;
            month: string;
            totalAsset: number;
            active: number;
            inactive: number;
            condemn: number;
        };
        report: any[];
    }>;
    equipmentsummarytest4(request: Request, startdate: number, enddate: number): Promise<{
        totalReport: {
            site: any;
            month: string;
            totalAsset: number;
            active: number;
            inactive: number;
            condemn: number;
        };
        report: any[];
    }>;
}