import { Equipment } from "./equipment.entity";
import { Company } from "./company.entity";
export declare class Category {
    id: number;
    name: string;
    equipment: Equipment;
    company: Company;
}
