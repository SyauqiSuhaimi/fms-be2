import { Company } from "./company.entity";
import { Equipment } from "./equipment.entity";
export declare class Eq_Classifications {
    id: number;
    name: string;
    equipment: Equipment[];
    company: Company;
}
