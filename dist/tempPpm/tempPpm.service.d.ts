import { tempPpm } from "../entities/tempppm.entity";
import { Repository } from "typeorm";
export declare class tempPpmService {
    private tempPpmRepository;
    constructor(tempPpmRepository: Repository<tempPpm>);
    findAll(): Promise<tempPpm[]>;
    findtempPpm(condition: any): Promise<tempPpm[]>;
    findOne(condition: any): Promise<tempPpm>;
    create(data: tempPpm): Promise<tempPpm>;
    update(id: number, data: tempPpm): Promise<any>;
    remove(id: number): Promise<any>;
    clear(): Promise<any>;
    delCondition(condition: any): Promise<any>;
}
