import { Response, Request } from "express";
import { HolidayService } from "./holiday.service";
import { Holiday } from "../entities/holiday.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class HolidayController {
    private HolidayService;
    private jwtService;
    private GeneralService;
    constructor(HolidayService: HolidayService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<Holiday[]>;
    byCompany(request: Request): Promise<Holiday[]>;
    byCompany2(request: Request, id: number): Promise<Holiday[]>;
    generateHoliday(post_input: any, getYear: number, request: Request): Promise<{
        name: string;
        date: string;
    }[]>;
    findOne(id: number): Promise<Holiday>;
    create(createHolidayData: Holiday): Promise<Holiday>;
    update(id: number, updateHolidayData: Holiday): Promise<Holiday>;
    delete(id: number): Promise<any>;
    downloadexcel(res: Response): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
}
