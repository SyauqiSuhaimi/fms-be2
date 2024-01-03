import { Company } from "./company.entity";
import { Equipment } from "./equipment.entity";
import { Eq_Brand } from "./eq_brand.entity";
export declare class Eq_Model {
    id: number;
    name: string;
    equipment: Equipment[];
    company: Company;
    eq_brand: Eq_Brand;
}
