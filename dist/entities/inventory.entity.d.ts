import { CaseHistory } from "./caseHistory.entity";
import { Eq_Type } from "./eq_type.entity";
import { Company } from "./company.entity";
import { Inventory_Price_History } from "./inventory_price_history.entity";
import { Inventory_Usage } from "./inventory_usage.entity";
export declare class Inventory {
    id: number;
    name: string;
    cost: number;
    quantity: number;
    attachment: string;
    company: Company;
    casehistory: CaseHistory[];
    inventorypricehistory: Inventory_Price_History[];
    effectivePrice: Inventory_Price_History;
    eqtype: Eq_Type;
    inventoryusage: Inventory_Usage[];
    lower_limit: number;
}
