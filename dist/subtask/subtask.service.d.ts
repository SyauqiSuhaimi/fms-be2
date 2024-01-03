import { Subtask } from "../entities/subtask.entity";
import { Repository } from "typeorm";
export declare class subtaskService {
    private subtaskRepository;
    constructor(subtaskRepository: Repository<Subtask>);
    findAll(): Promise<Subtask[]>;
    findsubtask(condition: any): Promise<Subtask[]>;
    findOne(condition: any): Promise<Subtask>;
    create(data: Subtask): Promise<Subtask>;
    update(id: number, data: Subtask): Promise<any>;
    remove(id: number): Promise<any>;
    parseExcelFile(files: any): Promise<void>;
    private preProcessData;
    private saveData;
}
