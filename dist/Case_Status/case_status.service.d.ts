import { Case_Status } from "../entities/case_status.entity";
import { Repository } from "typeorm";
export declare class Case_StatusService {
    private case_statusRepository;
    constructor(case_statusRepository: Repository<Case_Status>);
    findAll(condition: any): Promise<Case_Status[]>;
    findOne(condition: any): Promise<Case_Status>;
    create(cases: Case_Status): Promise<Case_Status>;
    update(id: number, cases: Case_Status): Promise<any>;
    remove(id: number): Promise<any>;
}
