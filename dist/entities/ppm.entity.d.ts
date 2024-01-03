import { Equipment } from "./equipment.entity";
import { Case } from "./case.entity";
import { ppmChecklist } from "./ppmChecklist.entity";
import { tempPpm } from "./tempppm.entity";
export declare class PPM {
    id: number;
    name: string;
    description: string;
    interval: number;
    equipment: Equipment;
    cases: Case[];
    onholiday: boolean;
    task: string;
    start_date: number;
    previous_date: number;
    priority: number;
    replaceable: boolean;
    expected_duration: number;
    precision: string;
    ppmchecklist: ppmChecklist;
    tempPpm: tempPpm[];
}
