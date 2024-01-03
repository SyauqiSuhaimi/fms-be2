import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
import { Inventory_UsageService } from "./inventory_usage.service";
import { Inventory_Usage } from '../entities/inventory_usage.entity';
export declare class Inventory_UsageController {
    private Inventory_UsageService;
    private jwtService;
    private GeneralService;
    constructor(Inventory_UsageService: Inventory_UsageService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<Inventory_Usage[]>;
    findInventory(request: Request): Promise<Inventory_Usage[]>;
    byCompany(request: Request, id: number): Promise<Inventory_Usage[]>;
    findOne(id: number): Promise<Inventory_Usage>;
    create(createInventoryData: Inventory_Usage): Promise<Inventory_Usage>;
    delete(id: number): Promise<any>;
    getsparedata(): Promise<Inventory_Usage[]>;
    getspare1(startdate: number, enddate: number): Promise<{
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
    getspare2(): Promise<{
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
        datetime: string;
    }[]>;
    getspareall(startdate: number, enddate: number): Promise<unknown[]>;
}
