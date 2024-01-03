import { Response, Request } from "express";
import { qcService } from "./qc.service";
import { qc } from "../entities/qc.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class qcController {
    private qcService;
    private jwtService;
    private GeneralService;
    constructor(qcService: qcService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<qc[]>;
    findsubtask(id: number, request: Request): Promise<any[]>;
    findOne(id: number): Promise<qc>;
    create(createqcData: qc): Promise<qc>;
    update(id: number, updateqcData: qc): Promise<qc>;
    delete(id: number): Promise<any>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    downloadexcel(res: Response): Promise<void>;
}
