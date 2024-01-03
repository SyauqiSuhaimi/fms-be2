import { Company } from "./company.entity";
import { Subtask } from "./subtask.entity";
export declare class taskType {
    id: number;
    name: string;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    shift: boolean;
    frequency: string;
    company: Company;
    subtask: Subtask[];
}
