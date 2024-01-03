import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { PanelService } from "./panel.service";
import { Panel } from "../entities/panel.entity";
export declare class PanelController {
    private PanelService;
    private jwtService;
    constructor(PanelService: PanelService, jwtService: JwtService);
    fillAll(): Promise<Panel[]>;
    fillAlldata(id: number): Promise<Panel[]>;
    findOne(id: number): Promise<Panel>;
    findbyUser(request: Request): Promise<Panel>;
    create(createPanelData: Panel): Promise<Panel>;
    update(id: number, createPanelData: Panel): Promise<Panel>;
    delete(id: number): Promise<any>;
}
