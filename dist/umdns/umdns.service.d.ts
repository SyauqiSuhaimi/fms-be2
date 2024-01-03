import { umdns } from "../entities/umdns.entity";
import { Repository } from "typeorm";
export declare class umdnsService {
    private umdnsRepository;
    constructor(umdnsRepository: Repository<umdns>);
    findAll(): Promise<umdns[]>;
    find(condition: any): Promise<umdns[]>;
    findOne(condition: any): Promise<umdns>;
    create(data: umdns): Promise<umdns>;
    update(id: number, data: umdns): Promise<any>;
    remove(id: number): Promise<any>;
    classByCompany(userId: any): Promise<umdns[]>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
