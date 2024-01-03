import { Company } from "./company.entity";
import { Equipment } from "./equipment.entity";
export declare class manufacture {
    id: number;
    name: string;
    company: Company;
    equipment: Equipment[];
}
