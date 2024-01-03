import { User } from "../auth/user.entity";
import { Company } from "./company.entity";
import { Equipment } from "./equipment.entity";
import { Area } from "./area.entity";
export declare class Department {
    id: number;
    name: string;
    type: string;
    equipment: Equipment[];
    company: Company;
    users: User[];
    area: Area[];
}
