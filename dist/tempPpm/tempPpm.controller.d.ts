import { Request } from "express";
import { tempPpm } from "../entities/tempppm.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
import { tempPpmService } from "./tempPpm.service";
export declare class tempPpmController {
    private tempPpmService;
    private jwtService;
    private GeneralService;
    constructor(tempPpmService: tempPpmService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(request: Request): Promise<tempPpm[]>;
    findOne(id: number): Promise<tempPpm>;
    create(createtempPpmData: tempPpm): Promise<tempPpm>;
    update(id: number, updatetempPpmData: tempPpm): Promise<tempPpm>;
    delete(id: number): Promise<any>;
    saveAll(ppmList: any, ppmYear: number, startRange: number, endRange: number): Promise<{
        message: string;
    }>;
}
