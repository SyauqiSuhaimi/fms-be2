import { GroupCompanyService } from "./group_company.service";
import { GroupCompany } from "../entities/groupCompany.entity";
export declare class GroupCompanyController {
    private groupCompanyService;
    constructor(groupCompanyService: GroupCompanyService);
    fillAll(): Promise<GroupCompany[]>;
    findOne(id: number): Promise<GroupCompany>;
    create(createGroupCompanyData: GroupCompany): Promise<GroupCompany>;
    update(id: number, updateGroupCompanyData: GroupCompany): Promise<GroupCompany>;
    delete(id: number): Promise<any>;
}
