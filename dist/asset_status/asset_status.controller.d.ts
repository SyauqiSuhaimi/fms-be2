import { asset_statusService } from "./asset_status.service";
import { Asset_Status } from "../entities/asset_status.entity";
export declare class asset_statusController {
    private asset_statusService;
    constructor(asset_statusService: asset_statusService);
    fillAll(): Promise<Asset_Status[]>;
    findOne(id: number): Promise<Asset_Status>;
    create(createasset_statusData: Asset_Status): Promise<Asset_Status>;
    update(id: number, updateasset_statusData: Asset_Status): Promise<Asset_Status>;
    delete(id: number): Promise<any>;
}
