import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { Equipment_HistoryService } from "./equipment_history.service";
import { Equipment_History } from "../entities/equipment_history.entity";
import { GeneralService } from "../helper/general.service";
export declare class Equipment_HistoryController {
    private equipment_historyService;
    private jwtService;
    private GeneralService;
    constructor(equipment_historyService: Equipment_HistoryService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<Equipment_History[]>;
    findOne(id: number): Promise<Equipment_History>;
    create(createEquipment_historyData: Equipment_History): Promise<Equipment_History>;
    update(id: number, updateEquipment_historyData: Equipment_History): Promise<Equipment_History>;
    delete(id: number): Promise<any>;
    test2(cd: any): Promise<Equipment_History[]>;
    history(request: Request, startdate: number, enddate: number): Promise<Equipment_History[]>;
    historyeq(request: Request, startdate: number, enddate: number): Promise<any[]>;
    history1(request: Request, startdate: number, enddate: number): Promise<any[]>;
}
