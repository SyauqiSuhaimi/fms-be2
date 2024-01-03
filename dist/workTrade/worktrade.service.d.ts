import { User } from "../auth/user.entity";
import { WorkTrade } from "../entities/workTrade.entity";
import { Repository } from "typeorm";
export declare class WorkTradeService {
    private WorkTradeRepository;
    private userRepository;
    constructor(WorkTradeRepository: Repository<WorkTrade>, userRepository: Repository<User>);
    findAll(data: any): Promise<WorkTrade[]>;
    findOne(condition: any): Promise<WorkTrade>;
    findMany(condition: any): Promise<WorkTrade[]>;
    create(cases: WorkTrade): Promise<WorkTrade>;
    update(id: number, data: WorkTrade): Promise<any>;
    remove(id: number): Promise<any>;
    getbyuserID(id: number): Promise<any>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
