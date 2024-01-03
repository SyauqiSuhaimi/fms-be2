import { Equipment_History } from "./equipment_history.entity";
import { Equipment } from "./equipment.entity";
export declare class Equipment_Status {
    id: number;
    eqstatus_name: string;
    equipment_history: Equipment_History[];
    equipment: Equipment[];
}
