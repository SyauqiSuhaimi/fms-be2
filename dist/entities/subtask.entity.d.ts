import { Company } from "./company.entity";
import { taskType } from "./tasktype.entity";
export declare class Subtask {
    id: number;
    descripton: string;
    company: Company;
    tasktype: taskType[];
}
