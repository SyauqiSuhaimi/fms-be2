import { GroupCompany } from "../entities/groupCompany.entity";
import { Repository } from "typeorm";
export declare class GroupCompanyService {
    private groupCompanyRepository;
    constructor(groupCompanyRepository: Repository<GroupCompany>);
    findAll(): Promise<GroupCompany[]>;
    findOne(condition: any): Promise<GroupCompany>;
    create(data: GroupCompany): Promise<GroupCompany>;
    update(id: number, data: GroupCompany): Promise<any>;
    remove(id: number): Promise<any>;
}
