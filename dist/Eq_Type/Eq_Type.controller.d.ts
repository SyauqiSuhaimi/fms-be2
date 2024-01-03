import { Response, Request } from "express";
import { Eq_TypeService } from "./Eq_Type.service";
import { Eq_Type } from "../entities/eq_type.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class Eq_TypeController {
    private Eq_TypeService;
    private jwtService;
    private GeneralService;
    constructor(Eq_TypeService: Eq_TypeService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<Eq_Type[]>;
    findEq_Type(id: number): Promise<Eq_Type[]>;
    findOne(id: number): Promise<Eq_Type>;
    create(createEq_TypeData: Eq_Type): Promise<Eq_Type>;
    update(id: number, updateEq_TypeData: Eq_Type): Promise<Eq_Type>;
    delete(id: number): Promise<any>;
    downloadexcel(res: Response): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
}
