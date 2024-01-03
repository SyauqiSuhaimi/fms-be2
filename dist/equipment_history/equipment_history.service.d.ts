import { Repository } from "typeorm";
import { Equipment_History } from "../entities/equipment_history.entity";
export declare class Equipment_HistoryService {
    private equipment_historyRepository;
    httpService: any;
    constructor(equipment_historyRepository: Repository<Equipment_History>);
    findAll(data: any): Promise<Equipment_History[]>;
    findEquipment(condition: any): Promise<Equipment_History[]>;
    findOne(condition: any): Promise<Equipment_History>;
    create(cases: Equipment_History): Promise<Equipment_History>;
    update(id: number, cases: Equipment_History): Promise<any>;
    remove(id: number): Promise<any>;
}
