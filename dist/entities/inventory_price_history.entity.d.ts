import { Inventory } from "./inventory.entity";
import { Inventory_Usage } from "./inventory_usage.entity";
export declare class Inventory_Price_History {
    id: number;
    description: string;
    cost: number;
    resit_attachment: string;
    inventoryusage: Inventory_Usage[];
    inventory: Inventory;
    inventoryprice: Inventory;
}
