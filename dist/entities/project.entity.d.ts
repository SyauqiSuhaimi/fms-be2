import { Equipment } from "./equipment.entity";
import { mda } from "./mda.entity";
export declare class project {
    id: number;
    project_type: string;
    document_no: string;
    project_cost: string;
    project_no: string;
    equipment: Equipment;
    mda: mda[];
}
