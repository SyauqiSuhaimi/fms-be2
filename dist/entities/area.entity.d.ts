import { Company } from "./company.entity";
import { Department } from "./department.entity";
import { SubArea } from "./subArea.entity";
export declare class Area {
    id: number;
    code: string;
    name: string;
    type: string;
    company: Company;
    department: Department;
    subarea: SubArea[];
}
