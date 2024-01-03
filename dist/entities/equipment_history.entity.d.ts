import { Equipment_Status } from "./equipment_status.entity";
import { Equipment } from "./equipment.entity";
export declare class Equipment_History {
    id: number;
    eqhistory_name: string;
    time: number;
    Equipment_Status: Equipment_Status;
    equipment: Equipment;
    equipmenthistorystatus: Equipment;
}
