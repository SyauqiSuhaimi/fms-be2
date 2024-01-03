import { Company } from "./company.entity";
import { ServiceContract } from "./serviceContract.entity";
import { mda } from "./mda.entity";
import { Equipment } from "./equipment.entity";
export declare class Vendor {
    id: number;
    name: string;
    company: Company;
    servicecontract: ServiceContract[];
    mda: mda[];
    equipment: Equipment[];
}
