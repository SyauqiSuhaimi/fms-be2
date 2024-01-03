import { Response, Request } from "express";
import { tasktypeService } from "./tasktype.service";
import { taskType } from "../entities/tasktype.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class tasktypeController {
    private tasktypeService;
    private jwtService;
    private GeneralService;
    constructor(tasktypeService: tasktypeService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<taskType[]>;
    findtasktype(id: number, request: Request): Promise<any[]>;
    findOne(id: number): Promise<taskType>;
    create(createData: taskType): Promise<taskType>;
    update(id: number, updateData: taskType): Promise<taskType>;
    delete(id: number): Promise<any>;
    downloadexcel(res: Response): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    uploadFile(body: any, files: any): Promise<void>;
}
