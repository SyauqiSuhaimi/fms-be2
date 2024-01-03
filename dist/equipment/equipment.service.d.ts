import { Equipment } from "../entities/equipment.entity";
import { Repository } from "typeorm";
import { User } from "../auth/user.entity";
import { Equipment_HistoryService } from "../equipment_history/equipment_history.service";
export declare class EquipmentService {
    private equipmentRepository;
    private userRepository;
    private Equipment_HistoryService;
    httpService: any;
    constructor(equipmentRepository: Repository<Equipment>, userRepository: Repository<User>, Equipment_HistoryService: Equipment_HistoryService);
    findAll(data: any): Promise<Equipment[]>;
    findEquipment(condition: any): Promise<Equipment[]>;
    findOne(condition: any): Promise<Equipment>;
    create(body: any): Promise<Equipment>;
    update(id: number, cases: any): Promise<any>;
    update2(id: number, eq: any): Promise<any>;
    remove(id: number): Promise<any>;
    getbyuserID(id: number): Promise<any>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
    private changeDate;
}
