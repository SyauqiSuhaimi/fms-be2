import { Deduction } from "./deduction.entity";
import { Company } from "./company.entity";
import { Case } from "./case.entity";
export declare class Rating {
    id: number;
    name: string;
    deduction: Deduction;
    company: Company;
    cases: Case[];
}
