import { Repository } from "typeorm";
import { Inventory_Price_History } from "../entities/inventory_price_history.entity";
export declare class Inventory_Price_historyService {
    private InventoryHistoryRepository;
    constructor(InventoryHistoryRepository: Repository<Inventory_Price_History>);
    findAll(): Promise<Inventory_Price_History[]>;
    findInventory(condition: any): Promise<Inventory_Price_History[]>;
    findOne(condition: any): Promise<Inventory_Price_History>;
    create(data: Partial<Inventory_Price_History>): Promise<Inventory_Price_History>;
    update(id: number, data: Inventory_Price_History): Promise<any>;
    remove(id: number): Promise<any>;
}
