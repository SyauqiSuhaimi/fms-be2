import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { mdaService } from "./mda.service";
import { mda } from "../entities/mda.entity";
export declare class mdaController {
    private mdaService;
    private jwtService;
    constructor(mdaService: mdaService, jwtService: JwtService);
    fillAll(): Promise<mda[]>;
    findOne(id: number): Promise<mda>;
    bycompany(request: Request): Promise<mda[]>;
    create(createmdaData: mda): Promise<mda>;
    update(id: number, createmdaData: mda): Promise<mda>;
    delete(id: number): Promise<any>;
}
