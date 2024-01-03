import { Company } from "./company.entity";
export declare class GroupCompany {
    id: number;
    name: string;
    status: boolean;
    company: Company[];
    dashboardmap: string;
}
