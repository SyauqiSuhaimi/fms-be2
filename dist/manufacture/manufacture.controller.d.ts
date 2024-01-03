import { Response, Request } from "express";
import { manufactureService } from "./manufacture.service";
import { manufacture } from "../entities/manufacture.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class manufactureController {
    private manufactureService;
    private jwtService;
    private GeneralService;
    constructor(manufactureService: manufactureService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<manufacture[]>;
    findsubtask(id: number, request: Request): Promise<any[]>;
    findOne(id: number): Promise<manufacture>;
    create(createmanufactureData: manufacture): Promise<manufacture>;
    update(id: number, updatemanufactureData: manufacture): Promise<manufacture>;
    delete(id: number): Promise<any>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    downloadexcel(res: Response): Promise<void>;
}
