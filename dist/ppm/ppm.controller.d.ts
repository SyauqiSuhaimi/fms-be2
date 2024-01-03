import { Response, Request } from "express";
import { PPMService } from "./ppm.service";
import { Holiday } from "../entities/holiday.entity";
import { PPM } from "../entities/ppm.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class PPMController {
    private PpmService;
    private jwtService;
    private GeneralService;
    constructor(PpmService: PPMService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<PPM[]>;
    findOne(id: number): Promise<PPM>;
    create(createPpmData: PPM): Promise<PPM>;
    update(id: number, updatePpmData: PPM): Promise<PPM>;
    delete(id: number): Promise<any>;
    dataForPPM(request: Request, formBody: any): Promise<{
        holiday: Holiday[];
        ppmList: any;
    }>;
    downloadexcel(res: Response): Promise<void>;
    epochtodate(d: number): string;
    downloadExcelData(res: Response): Promise<void>;
    uploadFile(body: any, files: any): Promise<void>;
}
