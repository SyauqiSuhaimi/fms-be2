import { Case } from "../entities/case.entity";
import { Reporting } from "../reporting/entities/reporting.entity";
import { Repository } from "typeorm";
export declare class CaseService {
    private CaseRepository;
    constructor(CaseRepository: Repository<Case>);
    findAll(condition?: any): Promise<Case[]>;
    findCase(condition: any): Promise<Case[]>;
    findUnassigned(condition: any): Promise<Case[]>;
    findOne(condition: any): Promise<Case>;
    create(data: Case): Promise<Case>;
    update(id: number, data: Case): Promise<any>;
    remove(id: number): Promise<any>;
    delCondition(condition: any): Promise<any>;
    reportCase(condition: any): Promise<Reporting<Case>>;
    getPPM(userId: any, bodyData: any): Promise<Case[]>;
    createQueryBuilder(alias: string): import("typeorm").SelectQueryBuilder<Case>;
    getCasebyCompany(userId: any, bodyData: any): Promise<Case[]>;
    getCaseCount(userId: any, bodyData: any): Promise<Case[]>;
    getppmCount(userId: any, bodyData: any): Promise<Case[]>;
    getdata(): Promise<Case[]>;
    epochtodate(d: any): string;
    downloaddata(): Promise<unknown>;
    downloadexceldata(): Promise<void>;
}
