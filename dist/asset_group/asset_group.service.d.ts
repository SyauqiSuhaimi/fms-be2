import { asset_group } from "../entities/asset_group.entity";
import { Repository } from "typeorm";
export declare class asset_groupService {
    private asset_groupRepository;
    constructor(asset_groupRepository: Repository<asset_group>);
    findAll(): Promise<asset_group[]>;
    find(condition: any): Promise<asset_group[]>;
    findOne(condition: any): Promise<asset_group>;
    create(data: asset_group): Promise<asset_group>;
    update(id: number, data: asset_group): Promise<any>;
    remove(id: number): Promise<any>;
    byCompany(userId: any): Promise<asset_group[]>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
