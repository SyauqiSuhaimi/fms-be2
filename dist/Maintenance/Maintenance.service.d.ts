import { Maintenance } from "../entities/maintenance.entity";
import { Repository } from "typeorm";
export declare class MaintenanceService {
    private MaintenanceRepository;
    constructor(MaintenanceRepository: Repository<Maintenance>);
    findAll(): Promise<Maintenance[]>;
    findOne(condition: any): Promise<Maintenance>;
    create(data: Maintenance): Promise<Maintenance>;
    update(id: number, data: Maintenance): Promise<any>;
    remove(id: number): Promise<any>;
}
