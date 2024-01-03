import { Asset_Status } from "../entities/asset_status.entity";
import { Repository } from "typeorm";
export declare class asset_statusService {
    private asset_statusRepository;
    constructor(asset_statusRepository: Repository<Asset_Status>);
    findAll(): Promise<Asset_Status[]>;
    findOne(condition: any): Promise<Asset_Status>;
    create(data: Asset_Status): Promise<Asset_Status>;
    update(id: number, data: Asset_Status): Promise<any>;
    remove(id: number): Promise<any>;
}
