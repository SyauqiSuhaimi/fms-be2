import { Company } from "./company.entity";
import { Equipment } from "./equipment.entity";
import { Case } from "./case.entity";
import { ppmChecklist } from "./ppmChecklist.entity";
import { Vendor } from "./vendor.entity";
export declare class ServiceContract {
    id: number;
    refno: string;
    vendor: Vendor;
    contract_start: number;
    contract_end: number;
    status: boolean;
    contract_value: number;
    company: Company;
    equipment: Equipment[];
    cases: Case[];
    ppmchecklist: ppmChecklist;
}
