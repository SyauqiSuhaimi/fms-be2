import { Case } from "./case.entity";
import { Company } from "./company.entity";
import { CaseHistory } from "./caseHistory.entity";
export declare class Case_Status {
    id: number;
    name: string;
    company: Company;
    cases: Case[];
    oldcasehitory: CaseHistory;
    newcasehitory: CaseHistory;
}
