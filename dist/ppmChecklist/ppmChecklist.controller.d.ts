/// <reference types="multer" />
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { ppmChecklist } from "../entities/ppmChecklist.entity";
import { GeneralService } from "../helper/general.service";
import { ppmChecklistService } from "./ppmChecklist.service";
export declare class ppmChecklistController {
    private ppmChecklistService;
    private jwtService;
    private GeneralService;
    constructor(ppmChecklistService: ppmChecklistService, jwtService: JwtService, GeneralService: GeneralService);
    findAll(request: Request): Promise<ppmChecklist[]>;
    findOne(id: number): Promise<ppmChecklist>;
    update(id: number, updateCaseData: ppmChecklist): Promise<ppmChecklist>;
    delete(id: number): Promise<any>;
    createcase(body: any, files: Array<Express.Multer.File>): string;
}
