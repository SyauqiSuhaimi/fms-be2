import { Company } from "./company.entity";
import { Case } from "./case.entity";
export declare class qc {
    id: number;
    code: string;
    description: string;
    company: Company;
    cases: Case[];
}
