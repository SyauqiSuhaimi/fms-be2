import { Company } from "./company.entity";
import { Equipment } from "./equipment.entity";
import { WorkTrade } from "./workTrade.entity";
import { Inventory } from "./inventory.entity";
import { Case } from "./case.entity";
import { GroupMain } from "./groupMain.entity";
import { ppmChecklist } from "./ppmChecklist.entity";
export declare class Eq_Type {
    id: number;
    code: string;
    name: string;
    equipment: Equipment[];
    company: Company;
    worktrade: WorkTrade;
    inventory: Inventory;
    cases: Case[];
    groupmain: GroupMain;
    ppmchecklist: ppmChecklist[];
}
