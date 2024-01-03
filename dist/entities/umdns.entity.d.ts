import { Company } from "./company.entity";
import { Equipment } from "./equipment.entity";
export declare class umdns {
    id: number;
    code: string;
    name: string;
    description: string;
    level: string;
    company: Company;
    equipment: Equipment[];
}
