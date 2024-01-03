import { Repository } from "typeorm";
import { Inventory_Usage } from '../entities/inventory_usage.entity';
export declare class Inventory_UsageService {
    private InventoryHistoryRepository;
    constructor(InventoryHistoryRepository: Repository<Inventory_Usage>);
    findAll(): Promise<Inventory_Usage[]>;
    findInventoryusage(condition: any): Promise<Inventory_Usage[]>;
    findOne(condition: any): Promise<Inventory_Usage>;
    create(data: Inventory_Usage): Promise<Inventory_Usage>;
    update(id: number, data: Inventory_Usage): Promise<any>;
    remove(id: number): Promise<any>;
}
