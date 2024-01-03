/// <reference types="multer" />
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
import { Inventory_Price_historyService } from "./inventory_price_history.service";
import { Inventory_Price_History } from "../entities/inventory_price_history.entity";
export declare class Inventory_Price_HistoryController {
    private Inventory_price_historyService;
    private jwtService;
    private GeneralService;
    constructor(Inventory_price_historyService: Inventory_Price_historyService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<Inventory_Price_History[]>;
    findInventory(request: Request): Promise<Inventory_Price_History[]>;
    byCompany(request: Request, id: number): Promise<Inventory_Price_History[]>;
    findOne(id: number): Promise<Inventory_Price_History>;
    create(createInventoryData: Inventory_Price_History): Promise<Inventory_Price_History>;
    createcase(body: any, files: Array<Express.Multer.File>): Promise<Inventory_Price_History>;
    update(id: number, updateInventoryData: Inventory_Price_History): Promise<Inventory_Price_History>;
    delete(id: number): Promise<any>;
}
