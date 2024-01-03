import { Response, Request } from "express";
import { Eq_ClassService } from "./Eq_Class.service";
import { Eq_Classifications } from "../entities/eq_classification.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class Eq_ClassController {
    private Eq_ClassService;
    private jwtService;
    private GeneralService;
    constructor(Eq_ClassService: Eq_ClassService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<Eq_Classifications[]>;
    findEq_Class(id: number): Promise<Eq_Classifications[]>;
    findOne(id: number): Promise<Eq_Classifications>;
    create(createEq_ClassData: Eq_Classifications): Promise<Eq_Classifications>;
    update(id: number, updateEq_ClassData: Eq_Classifications): Promise<Eq_Classifications>;
    delete(id: number): Promise<any>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    downloadexcel(res: Response): Promise<void>;
}
