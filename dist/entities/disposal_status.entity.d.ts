import { Equipment } from "./equipment.entity";
export declare class disposal_status {
    id: number;
    disposal_approve_date: number;
    disposal_date: number;
    disposed_by: string;
    disposed_method: string;
    disposal_sign: string;
    equipment: Equipment;
}
