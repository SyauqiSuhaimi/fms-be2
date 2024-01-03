import { Company } from "../entities/company.entity";
import { Repository } from "typeorm";
export declare class CompanyService {
    private CompanyRepository;
    constructor(CompanyRepository: Repository<Company>);
    findAll(): Promise<Company[]>;
    findCompany(condition: any): Promise<Company[]>;
    findOne(condition: any): Promise<Company>;
    create(cases: Company): Promise<Company>;
    update(id: number, cases: Company): Promise<any>;
    remove(id: number): Promise<any>;
}
