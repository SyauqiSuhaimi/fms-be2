import { taskType } from "../entities/tasktype.entity";
import { Repository } from "typeorm";
export declare class tasktypeService {
    private tasktypeRepository;
    constructor(tasktypeRepository: Repository<taskType>);
    findAll(): Promise<taskType[]>;
    findtasktype(condition: any): Promise<taskType[]>;
    findOne(condition: any): Promise<taskType>;
    create(data: taskType): Promise<taskType>;
    update(id: number, data: taskType): Promise<any>;
    remove(id: number): Promise<any>;
    parseExcelFile(files: any): Promise<void>;
    private preProcessData;
    private saveData;
}
