import { Response, Request } from "express";
import { AreaService } from "./Area.service";
import { Area } from "../entities/area.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class AreaController {
    private areaService;
    private jwtService;
    private GeneralService;
    constructor(areaService: AreaService, jwtService: JwtService, GeneralService: GeneralService);
    findAll(): Promise<Area[]>;
    findArea(id: number): Promise<Area[]>;
    findOne(id: number): Promise<Area>;
    create(createAreaData: Area): Promise<Area>;
    update(id: number, updateAreaData: Area): Promise<Area>;
    delete(id: number): Promise<{
        affected: number;
    }>;
    downloadexcel(res: Response): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
}
