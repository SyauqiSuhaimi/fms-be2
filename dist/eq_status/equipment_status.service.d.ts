import { Equipment_Status } from "../entities/equipment_status.entity";
import { Repository } from "typeorm";
export declare class equipment_statusService {
    private equipment_statusRepository;
    constructor(equipment_statusRepository: Repository<Equipment_Status>);
    findAll(): Promise<Equipment_Status[]>;
    findOne(condition: any): Promise<Equipment_Status>;
    create(data: Equipment_Status): Promise<Equipment_Status>;
    update(id: number, data: Equipment_Status): Promise<any>;
    remove(id: number): Promise<any>;
}
