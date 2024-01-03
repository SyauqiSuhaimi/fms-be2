import { vo_statusService } from "./vo_status.service";
import { vo_status } from "../entities/vo_status.entity";
export declare class vo_statusController {
    private vo_statusService;
    constructor(vo_statusService: vo_statusService);
    fillAll(): Promise<vo_status[]>;
    findOne(id: number): Promise<vo_status>;
    create(createData: vo_status): Promise<vo_status>;
    update(id: number, updateData: vo_status): Promise<vo_status>;
    delete(id: number): Promise<any>;
}
