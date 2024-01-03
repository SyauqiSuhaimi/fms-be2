/// <reference types="multer" />
import { GeneralService } from "../helper/general.service";
import { Response, Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { CaseService } from "./case.service";
import { Case } from "../entities/case.entity";
import { EquipmentService } from "../equipment/equipment.service";
import { Case_StatusService } from "../Case_Status/case_status.service";
import { AuthService } from "../auth/auth.service";
import { CaseHistoryService } from "../Case_History/Case_History.service";
import { CaseHistory } from "../entities/caseHistory.entity";
import { GroupListService } from "../Group_list/group_list.service";
import { AreaService } from "../Area/Area.service";
import { NotificationsService } from "../notification/notification.service";
import { CasesGateway } from "../GatewayHandler/cases.gateway";
import { WorkTrade } from "../entities/workTrade.entity";
import { DepartmentService } from "../department/department.service";
import { SubAreaService } from "../Sub_Area/Sub_Area.service";
import { CaseTypeService } from "../Case_Type/Case_Type.service";
import { asset_statusService } from "../asset_status/asset_status.service";
import { qcService } from "../qc/qc.service";
import { Inventory_UsageService } from "../inventory_usage/inventory_usage.service";
export declare class CaseController {
    private caseService;
    private equipmentService;
    private jwtService;
    private Case_StatusService;
    private AuthService;
    private caseHistoryService;
    private GeneralService;
    private GroupListService;
    private AreaService;
    private notificationsService;
    private departmentService;
    private subAreaService;
    private casegateway;
    private casetypeService;
    private asset_statusService;
    private qcservice;
    private case_statusService;
    private Inventory_UsageService;
    constructor(caseService: CaseService, equipmentService: EquipmentService, jwtService: JwtService, Case_StatusService: Case_StatusService, AuthService: AuthService, caseHistoryService: CaseHistoryService, GeneralService: GeneralService, GroupListService: GroupListService, AreaService: AreaService, notificationsService: NotificationsService, departmentService: DepartmentService, subAreaService: SubAreaService, casegateway: CasesGateway, casetypeService: CaseTypeService, asset_statusService: asset_statusService, qcservice: qcService, case_statusService: Case_StatusService, Inventory_UsageService: Inventory_UsageService);
    findAll(request: Request): Promise<Case[]>;
    data(request: Request): Promise<Case[]>;
    findOne(id: number): Promise<Case>;
    byRange(startRange: number, endRange: number, request: Request): Promise<Case[]>;
    worktradeAll(bodyData: any, request: Request): Promise<any>;
    worktradeStatus(bodyData: any, request: Request): Promise<any>;
    UnassignedWorkOrder(bodyData: any, request: Request): Promise<any>;
    techStatus(bodyData: any, request: Request): Promise<any>;
    userStatus(bodyData: any, request: Request): Promise<any>;
    allPPM(bodyData: any, request: Request): Promise<Case[]>;
    delPPM(ppmList: any): Promise<{
        message: string;
    }>;
    savePPM(ppmList: any, ppmYear: number, startRange: number, endRange: number, request: Request): Promise<{
        message: string;
    }>;
    saveppmEq(ppmList: any, ppmYear: number, startRange: number, endRange: number, eqlist: any, request: Request): Promise<{
        message: string;
    }>;
    create(createCaseData: Case): Promise<Case>;
    update(id: number, updateCaseData: Case, case_status: any, equipment: any): Promise<Case>;
    updaten(id: number, updateCaseData: Case, case_status: any, equipment: any): Promise<Case>;
    update2(updateCaseData: any): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<any>;
    findDetail(id: number): Promise<Case>;
    workorder(idList: any): Promise<any>;
    getAllCaseList(): Promise<Case[]>;
    uploadFiles(body: any, files: Array<Express.Multer.File>): void;
    createcase(body: any, files: Array<Express.Multer.File>, request: Request): Promise<Case>;
    noti(email: any): Promise<void>;
    noti2(email: any, body: any): Promise<void>;
    uploadfile(files: any): string;
    dateToEpoch(thedate: any): number;
    get3Date(): {
        semalamDate: number;
        hariniDate: number;
        esokDate: number;
        lusaDate: number;
        firstDate: number;
        lastDate: number;
        StartMonth: number;
        EndMonth: number;
    };
    createcases(body: any, files: Array<Express.Multer.File>): Promise<CaseHistory>;
    downloaddata(res: Response): Promise<void>;
    testdownloadExcelData(res: Response): Promise<void>;
    getFormData(request: Request): Promise<{
        eqList: import("../entities/equipment.entity").Equipment[];
        groupList: import("../entities/groupList.entity").GroupList[];
        areaList: import("../entities/area.entity").Area[];
        casetypeList: import("../entities/caseType.entity").CaseType[];
        userlist: {
            id: number;
            name: string;
            email: string;
            rate: number;
            ot1: number;
            ot2: number;
            ot3: number;
            image_file: string;
            mobile_no: string;
            usertypes: import("../auth/usertype.entity").userType;
            department: import("../entities/department.entity").Department;
            maintenance: import("../entities/maintenance.entity").Maintenance[];
            grouplist: string;
            company: import("../entities/company.entity").Company;
            cases: Case[];
            casemaintained: import("../entities/technician.entity").Technician[];
            caseassigned: import("../entities/technician.entity").Technician[];
            worktrade: WorkTrade[];
            casehistory: CaseHistory[];
            user_casehistory: CaseHistory[];
            news: import("../entities/news.entity").News[];
            ppmchecklist: import("../entities/ppmChecklist.entity").ppmChecklist[];
            tempPpm: Case[];
            notifications: import("../entities/notification.entity").Notifications;
            workspace: import("../entities/workspace.entity").workspace[];
            designation: string;
            user_work_id: string;
            user_unit: string;
        }[];
        asset_statusList: import("../entities/asset_status.entity").Asset_Status[];
        qcList: import("../entities/qc.entity").qc[];
        casestatusList: import("../entities/case_status.entity").Case_Status[];
    }>;
    fitlerData(request: Request): Promise<{
        departmentList: import("../entities/department.entity").Department[];
        casetypeList: import("../entities/caseType.entity").CaseType[];
        groupList: import("../entities/groupList.entity").GroupList[];
    }>;
    summarycm7(request: Request, startdate: number, enddate: number): Promise<{
        summary: {
            site: any;
            type: string;
            workOrderGenerated: number;
            workOrderBroughtForward: number;
            totalWorkOrder: number;
            currentMonthComplete: number;
            broughtForward: number;
            outstanding: number;
        };
        details: any[];
        summaryCols: {
            name: string;
            align: string;
            field: string;
            label: string;
        }[];
        detailsCols: {
            name: string;
            align: string;
            field: string;
            label: string;
        }[];
    }>;
    getdata3(request: Request): Promise<{
        site: string;
        department: string;
        workorderno: number;
        assetno: string;
        assetname: string;
        actualstartdate: string;
        actualcompletedate: string;
        status: string;
        performed: string;
        verified: string;
        remark: string;
    }[]>;
    summaryppm(request: Request, startdate: number, enddate: number): Promise<{
        summary: {
            site: any;
            type: string;
            workOrderGenerated: number;
            workOrderBroughtForward: number;
            totalWorkOrder: number;
            currentMonthComplete: number;
            broughtForward: number;
            Reschedule: number;
        };
        details: any[];
        summaryCols: {
            name: string;
            align: string;
            field: string;
            label: string;
        }[];
        detailsCols: {
            name: string;
            align: string;
            field: string;
            label: string;
        }[];
    }>;
    summary(request: Request, year: number, month: number): Promise<{
        summary: {
            site: any;
            type: string;
            workOrderGenerated: number;
            workOrderBroughtForward: number;
            totalWorkOrder: number;
            currentMonthComplete: number;
            broughtForward: number;
            Reschedule: number;
        };
        details: any[];
        summaryCols: {
            name: string;
            align: string;
            field: string;
            label: string;
        }[];
        detailsCols: {
            name: string;
            align: string;
            field: string;
            label: string;
        }[];
    }>;
    summaryAndEquipment3(request: Request, startdate: number, enddate: number): Promise<{
        summary: {
            site: any;
            workrequest: number;
            broughtForward: number;
            totalWorkrequest: number;
            ontime: number;
            late: number;
        };
        details: any[];
        summaryCols: ({
            name: string;
            align: string;
            field: string;
            label: string;
            children?: undefined;
        } | {
            name: string;
            align: string;
            label: string;
            children: {
                name: string;
                align: string;
                field: string;
                label: string;
            }[];
            field?: undefined;
        })[];
        detailsCols: ({
            name: string;
            align: string;
            field: string;
            label: string;
            children?: undefined;
        } | {
            name: string;
            align: string;
            label: string;
            children: {
                name: string;
                align: string;
                field: string;
                label: string;
            }[];
            field?: undefined;
        })[];
    }>;
    costwk(request: Request): Promise<Case[]>;
    costwk4(request: Request): Promise<{
        eqtype: {
            name: any;
            reportitem: any;
        };
    }[]>;
    savechecklist(bodyData: any, request: Request): Promise<{
        message: string;
    }>;
}
