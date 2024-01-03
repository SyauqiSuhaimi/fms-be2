import { Response, Request } from "express";
import { asset_groupService } from "./asset_group.service";
import { asset_group } from "../entities/asset_group.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class asset_groupController {
    private asset_groupService;
    private jwtService;
    private GeneralService;
    constructor(asset_groupService: asset_groupService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<asset_group[]>;
    find(id: number): Promise<asset_group[]>;
    findOne(id: number): Promise<asset_group>;
    create(createData: asset_group): Promise<asset_group>;
    update(id: number, updateData: asset_group): Promise<asset_group>;
    delete(id: number): Promise<any>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    downloadexcel(res: Response): Promise<void>;
}
