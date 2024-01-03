import { Repository } from "typeorm";
import { Inventory } from "../entities/inventory.entity";
import { Inventory_Price_historyService } from "../inventory_price_history/inventory_price_history.service";
export declare class InventoryService {
    private InventoryRepository;
    private Inventory_Price_historyService;
    constructor(InventoryRepository: Repository<Inventory>, Inventory_Price_historyService: Inventory_Price_historyService);
    findAll(): Promise<Inventory[]>;
    findInventory(condition: any): Promise<Inventory[]>;
    findOne(condition: any): Promise<Inventory>;
    create(data: Inventory): Promise<Inventory>;
    update(id: number, data: Inventory): Promise<any>;
    remove(id: number): Promise<any>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
