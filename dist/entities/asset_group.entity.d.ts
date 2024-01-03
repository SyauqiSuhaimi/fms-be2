import { Company } from "./company.entity";
import { Equipment } from "./equipment.entity";
export declare class asset_group {
    id: number;
    code: string;
    name: string;
    equipment: Equipment[];
    company: Company;
}
