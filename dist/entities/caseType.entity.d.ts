import { Case } from "./case.entity";
import { Company } from "./company.entity";
export declare class CaseType {
    id: number;
    name: string;
    userAccess: boolean;
    buffer_day: number;
    completion_day: number;
    company: Company;
    cases: Case[];
}
