import { Response, Request } from "express";
import { subtaskService } from "./subtask.service";
import { Subtask } from "../entities/subtask.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
import { tasktypeService } from "../tasktype/tasktype.service";
export declare class subtaskController {
    private subtaskService;
    private jwtService;
    private GeneralService;
    private tasktypeService;
    constructor(subtaskService: subtaskService, jwtService: JwtService, GeneralService: GeneralService, tasktypeService: tasktypeService);
    fillAll(): Promise<Subtask[]>;
    findsubtask(id: number, request: Request): Promise<{
        response: any[];
        tasktypeList: any[];
    }>;
    findOne(id: number): Promise<Subtask>;
    create(createData: Subtask): Promise<Subtask>;
    update(id: number, updateData: Subtask): Promise<Subtask>;
    delete(id: number): Promise<any>;
    downloadexcel(res: Response): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    uploadFile(body: any, files: any): Promise<void>;
}
