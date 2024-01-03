import { Response, Request } from "express";
import { WorkTradeService } from "./worktrade.service";
import { WorkTrade } from "../entities/workTrade.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class WorkTradeController {
    private WorkTradeService;
    private jwtService;
    private GeneralService;
    constructor(WorkTradeService: WorkTradeService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<WorkTrade[]>;
    findOne(id: number): Promise<WorkTrade>;
    create(createWorkTradeData: WorkTrade): Promise<WorkTrade>;
    update(id: number, updateWorkTradeData: WorkTrade): Promise<any>;
    delete(id: number): Promise<any>;
    getbyuserID(request: Request): Promise<any>;
    byCompany(id: number): Promise<WorkTrade[]>;
    byUser(request: Request): Promise<WorkTrade[]>;
    downloadexcel(res: Response): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
    getdata(request: Request): Promise<{
        eqtype: {
            name: string;
            reportitem: unknown;
        };
    }[]>;
    getdata2(request: Request): Promise<{
        reportItems: {
            "No.": string;
            Indicators: string;
            "Checklist Ref. No.": string;
            "Frequency for 5 Years": number;
            "Payment Fee for 5 Years (RM)": number;
            Quantity: number;
            "Unit (Unit / Lot / Nos)": string;
            "Quantity of Checklist by Department / Block / Nos (Planned)": number;
            "Quantity of Checklist by Department / Block / Nos (Actual)": number;
            "Contract Price / Frequency (RM)": string;
            "Monthly Planned Work": number;
            "Monthly Planned Fee (RM)": number;
            "Monthly Actual Work Done": number;
            "Monthly Actual Fee (RM)": string;
            Rating: string;
            "Monthly Deductible Fee (RM)": number;
            "Monthly Payable Fee (RM)": number;
        }[];
    }>;
}
