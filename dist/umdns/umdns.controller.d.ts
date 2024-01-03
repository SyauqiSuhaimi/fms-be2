import { Response, Request } from "express";
import { umdnsService } from "./umdns.service";
import { umdns } from "../entities/umdns.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class umdnsController {
    private umdnsService;
    private jwtService;
    private GeneralService;
    constructor(umdnsService: umdnsService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<umdns[]>;
    findsubtask(id: number, request: Request): Promise<any[]>;
    findOne(id: number): Promise<umdns>;
    create(createumdnsData: umdns): Promise<umdns>;
    update(id: number, updateumdnsData: umdns): Promise<umdns>;
    delete(id: number): Promise<any>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    downloadexcel(res: Response): Promise<void>;
}
