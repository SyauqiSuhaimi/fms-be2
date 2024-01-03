import { Request } from "express";
import { CaseTypeService } from "./Case_Type.service";
import { CaseType } from "../entities/caseType.entity";
import { JwtService } from "@nestjs/jwt";
export declare class CaseTypeController {
    private caseTypeService;
    private jwtService;
    constructor(caseTypeService: CaseTypeService, jwtService: JwtService);
    fillAll(): Promise<CaseType[]>;
    findbyUser(request: Request): Promise<CaseType[]>;
    ppmType(request: Request): Promise<CaseType>;
    transfertype(request: Request): Promise<CaseType>;
    findsubtask(id: number, request: Request): Promise<any[]>;
    findOne(id: number): Promise<CaseType>;
    create(createcaseTypeData: CaseType): Promise<CaseType>;
    update(id: number, updatecaseTypeData: CaseType): Promise<CaseType>;
    delete(id: number): Promise<any>;
}
