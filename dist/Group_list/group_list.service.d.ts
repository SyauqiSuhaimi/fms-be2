import { GroupList } from "../entities/groupList.entity";
import { Repository } from "typeorm";
import { WorkTrade } from "../entities/workTrade.entity";
export declare class GroupListService {
    private groupListRepository;
    private WorkTradeRepository;
    constructor(groupListRepository: Repository<GroupList>, WorkTradeRepository: Repository<WorkTrade>);
    findAll(): Promise<GroupList[]>;
    findall(condition: any): Promise<GroupList[]>;
    findOne(condition: any): Promise<GroupList>;
    create(data: GroupList): Promise<GroupList>;
    update(id: number, data: GroupList): Promise<any>;
    remove(id: number): Promise<any>;
    findMany(condition: any): Promise<GroupList[]>;
    groupByCompany(userId: any): Promise<GroupList[]>;
    parseExceltestFile(files: any[], company: string): Promise<void>;
    private preProcessData;
    private saveData;
}
