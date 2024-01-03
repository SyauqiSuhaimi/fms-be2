import { Company } from "./company.entity";
import { Equipment } from "./equipment.entity";
import { Eq_Model } from "./eq_model.entity";
export declare class Eq_Brand {
    id: number;
    name: string;
    equipment: Equipment[];
    company: Company;
    eq_model: Eq_Model;
}
