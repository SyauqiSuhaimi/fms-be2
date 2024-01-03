import { MaintenanceService } from "./Maintenance.service";
import { Maintenance } from "../entities/maintenance.entity";
export declare class MaintenanceController {
    private maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    fillAll(): Promise<Maintenance[]>;
    findOne(id: number): Promise<Maintenance>;
    create(createMaintenanceData: Maintenance): Promise<Maintenance>;
    update(id: number, updateMaintenanceData: Maintenance): Promise<Maintenance>;
    delete(id: number): Promise<any>;
}
