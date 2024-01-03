import { Equipment } from "./equipment.entity";
export declare class Category_critical {
    id: number;
    name: string;
    critical: boolean;
    response_time: number;
    completion_time: number;
    equipment: Equipment;
}
