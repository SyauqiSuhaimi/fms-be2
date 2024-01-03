import { equipment_statusService } from "./equipment_status.service";
import { Equipment_Status } from "../entities/equipment_status.entity";
export declare class equipment_statusController {
    private equipment_statusService;
    constructor(equipment_statusService: equipment_statusService);
    fillAll(): Promise<Equipment_Status[]>;
    findOne(id: number): Promise<Equipment_Status>;
    create(createequipment_statusData: Equipment_Status): Promise<Equipment_Status>;
    update(id: number, updateequipment_statusData: Equipment_Status): Promise<Equipment_Status>;
    delete(id: number): Promise<any>;
}
