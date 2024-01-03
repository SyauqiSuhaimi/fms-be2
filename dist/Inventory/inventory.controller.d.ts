import { Response, Request } from "express";
import { InventoryService } from "./inventory.service";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
import { Inventory } from "../entities/inventory.entity";
import { Inventory_Price_historyService } from "../inventory_price_history/inventory_price_history.service";
export declare class InventoryController {
    private InventoryService;
    private Inventory_Price_historyService;
    private jwtService;
    private GeneralService;
    constructor(InventoryService: InventoryService, Inventory_Price_historyService: Inventory_Price_historyService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<Inventory[]>;
    findInventory(request: Request): Promise<Inventory[]>;
    byCompany(request: Request, id: number): Promise<Inventory[]>;
    findOne(id: number): Promise<Inventory>;
    create(createInventoryData: Inventory): Promise<{
        id: number;
        name: string;
        cost: number;
        quantity: number;
        attachment: string;
        company: import("../entities/company.entity").Company;
        casehistory: import("../entities/caseHistory.entity").CaseHistory[];
        inventorypricehistory: import("../entities/inventory_price_history.entity").Inventory_Price_History[];
        eqtype: import("../entities/eq_type.entity").Eq_Type;
        inventoryusage: import("../entities/inventory_usage.entity").Inventory_Usage[];
        lower_limit: number;
    }>;
    update(id: number, updateInventoryData: Inventory): Promise<any>;
    delete(id: number): Promise<any>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    downloadexcel(res: Response): Promise<void>;
    sparepartsummaryla(bodyData: any, request: Request): Promise<{
        site: any;
        department: any;
        workType: any;
        workRequestNumber: any;
        assetNumber: any;
        assetName: any;
        problemDescription: any;
        serviceRequestStatus: any;
        partDescription: any;
        qty: any;
    }[]>;
    sparepartsummaryla2(bodyData: any, request: Request): Promise<{
        site: any;
        department: any;
        workType: any;
        workRequestNumber: any;
        assetNumber: any;
        assetName: any;
        problemDescription: any;
        serviceRequestStatus: any;
        partDescription: any;
        qty: any;
    }[]>;
}
