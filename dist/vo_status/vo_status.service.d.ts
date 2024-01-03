import { vo_status } from "../entities/vo_status.entity";
import { Repository } from "typeorm";
export declare class vo_statusService {
    private vo_statusRepository;
    constructor(vo_statusRepository: Repository<vo_status>);
    findAll(): Promise<vo_status[]>;
    findOne(condition: any): Promise<vo_status>;
    find(condition: any): Promise<vo_status[]>;
    create(data: vo_status): Promise<vo_status>;
    update(id: number, data: vo_status): Promise<any>;
    remove(id: number): Promise<any>;
}
