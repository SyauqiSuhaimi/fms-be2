import { Eq_Classifications } from "../entities/eq_classification.entity";
import { Repository } from "typeorm";
export declare class Eq_ClassService {
    private Eq_ClassRepository;
    constructor(Eq_ClassRepository: Repository<Eq_Classifications>);
    findAll(): Promise<Eq_Classifications[]>;
    findEq_Class(condition: any): Promise<Eq_Classifications[]>;
    findOne(condition: any): Promise<Eq_Classifications>;
    create(data: Eq_Classifications): Promise<Eq_Classifications>;
    update(id: number, data: Eq_Classifications): Promise<any>;
    remove(id: number): Promise<any>;
    classByCompany(userId: any): Promise<Eq_Classifications[]>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
