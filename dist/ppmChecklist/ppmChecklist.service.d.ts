import { Repository } from "typeorm";
import { ppmChecklist } from "../entities/ppmChecklist.entity";
export declare class ppmChecklistService {
    private ppmChecklistRepository;
    constructor(ppmChecklistRepository: Repository<ppmChecklist>);
    findAll(condition?: any): Promise<ppmChecklist[]>;
    findCase(condition: any): Promise<ppmChecklist[]>;
    findUnassigned(condition: any): Promise<ppmChecklist[]>;
    findOne(condition: any): Promise<ppmChecklist>;
    create(data: ppmChecklist): Promise<ppmChecklist>;
    update(id: number, data: ppmChecklist): Promise<any>;
    remove(id: number): Promise<any>;
    ppmChecklistByCompany(userId: any): Promise<ppmChecklist[]>;
}
