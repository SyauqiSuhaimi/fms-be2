import { manufacture } from "../entities/manufacture.entity";
import { Repository } from "typeorm";
export declare class manufactureService {
    private manufactureRepository;
    constructor(manufactureRepository: Repository<manufacture>);
    findAll(): Promise<manufacture[]>;
    find(condition: any): Promise<manufacture[]>;
    findOne(condition: any): Promise<manufacture>;
    create(data: manufacture): Promise<manufacture>;
    update(id: number, data: manufacture): Promise<any>;
    remove(id: number): Promise<any>;
    classByCompany(userId: any): Promise<manufacture[]>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
