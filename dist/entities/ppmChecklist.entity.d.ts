import { PPM } from "./ppm.entity";
import { Company } from "./company.entity";
import { User } from "../auth/user.entity";
import { ServiceContract } from "./serviceContract.entity";
import { Eq_Type } from "./eq_type.entity";
export declare class ppmChecklist {
    id: number;
    name: string;
    path: string;
    upload_date: number;
    coordinate: string;
    referenceNo: string;
    company: Company;
    ppm: PPM[];
    uploader: User;
    serviceContract: ServiceContract[];
    eqtype: Eq_Type;
}
