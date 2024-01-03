import { qc } from "../entities/qc.entity";
import { Repository } from "typeorm";
export declare class qcService {
    private qcRepository;
    constructor(qcRepository: Repository<qc>);
    findAll(): Promise<qc[]>;
    find(condition: any): Promise<qc[]>;
    findOne(condition: any): Promise<qc>;
    create(data: qc): Promise<qc>;
    update(id: number, data: qc): Promise<any>;
    remove(id: number): Promise<any>;
    classByCompany(userId: any): Promise<qc[]>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
