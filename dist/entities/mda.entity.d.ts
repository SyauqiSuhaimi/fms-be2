import { Equipment } from "./equipment.entity";
import { Vendor } from "./vendor.entity";
import { project } from "./project.entity";
import { Company } from "./company.entity";
export declare class mda {
    id: number;
    mda_class_category: string;
    mda_registration_no: string;
    lar_registration_no: string;
    contract_no: string;
    equipment: Equipment;
    vendor: Vendor;
    project: project;
    company: Company;
}
