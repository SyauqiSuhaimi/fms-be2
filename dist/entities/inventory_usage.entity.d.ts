import { Inventory } from "./inventory.entity";
import { Case } from "./case.entity";
import { CaseHistory } from "./caseHistory.entity";
import { Inventory_Price_History } from "./inventory_price_history.entity";
export declare class Inventory_Usage {
    id: number;
    count: number;
    datetime: number;
    inventory: Inventory;
    cases: Case;
    casehistory: CaseHistory;
    inventorypricehistory: Inventory_Price_History;
}
