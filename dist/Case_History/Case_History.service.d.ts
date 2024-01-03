import { CaseHistory } from "../entities/caseHistory.entity";
import { Repository } from "typeorm";
export declare class CaseHistoryService {
    private CaseHistoryRepository;
    constructor(CaseHistoryRepository: Repository<CaseHistory>);
    findAll(): Promise<CaseHistory[]>;
    findOne(condition: any): Promise<CaseHistory>;
    create(data: CaseHistory): Promise<CaseHistory>;
    update(id: number, data: CaseHistory): Promise<any>;
    remove(id: number): Promise<any>;
    getCostsForCase(cases: number): Promise<{
        vendor_cost: number;
        material_cost: number;
        labour_cost: number;
        cost: number;
    }>;
}
