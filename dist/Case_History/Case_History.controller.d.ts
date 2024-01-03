/// <reference types="multer" />
import { CaseHistoryService } from "./Case_History.service";
import { CaseHistory } from "../entities/caseHistory.entity";
import { CaseService } from "../case/case.service";
import { AuthService } from "../auth/auth.service";
import { NotificationsService } from "../notification/notification.service";
import { CasesGateway } from "../GatewayHandler/cases.gateway";
import { EquipmentService } from "../equipment/equipment.service";
import { Case_StatusService } from "../Case_Status/case_status.service";
import { Inventory_UsageService } from "../inventory_usage/inventory_usage.service";
import { Equipment_HistoryService } from "../equipment_history/equipment_history.service";
import { equipment_statusService } from "../eq_status/equipment_status.service";
import { GeneralService } from "../helper/general.service";
export declare class CaseHistoryController {
    private caseHistoryService;
    private caseService;
    private AuthService;
    private notificationsService;
    private casegateway;
    private equipmentService;
    private Case_StatusService;
    private Inventory_UsageService;
    private Equipment_HistoryService;
    private equipment_statusService;
    private GeneralService;
    constructor(caseHistoryService: CaseHistoryService, caseService: CaseService, AuthService: AuthService, notificationsService: NotificationsService, casegateway: CasesGateway, equipmentService: EquipmentService, Case_StatusService: Case_StatusService, Inventory_UsageService: Inventory_UsageService, Equipment_HistoryService: Equipment_HistoryService, equipment_statusService: equipment_statusService, GeneralService: GeneralService);
    fillAll(): Promise<CaseHistory[]>;
    findOne(id: number): Promise<CaseHistory>;
    create(file: Array<Express.Multer.File>, createcaseHistoryeData: any): Promise<CaseHistory>;
    update(id: number, updatecaseHistoryData: CaseHistory): Promise<CaseHistory>;
    delete(id: number): Promise<any>;
    createcase(body: any, files: Array<Express.Multer.File>): Promise<{}>;
}
