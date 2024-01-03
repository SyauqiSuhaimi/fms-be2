import { Response, Request } from "express";
import { SubAreaService } from "./Sub_Area.service";
import { SubArea } from "../entities/subArea.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class SubAreaController {
    private subareaService;
    private jwtService;
    private GeneralService;
    constructor(subareaService: SubAreaService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<SubArea[]>;
    findSubArea(id: number): Promise<SubArea[]>;
    findOne(id: number): Promise<SubArea>;
    create(createSubAreaData: SubArea): Promise<SubArea>;
    update(id: number, updateSubAreaData: SubArea): Promise<SubArea>;
    delete(id: number): Promise<any>;
    downloadexcel(res: Response): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    uploadFile(body: any, files: any): Promise<void>;
}
