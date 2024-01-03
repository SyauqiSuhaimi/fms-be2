import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { WorkspaceService } from "./workspace.service";
import { workspace } from "../entities/workspace.entity";
export declare class workspaceController {
    private WorkspaceService;
    private jwtService;
    constructor(WorkspaceService: WorkspaceService, jwtService: JwtService);
    fillAll(): Promise<workspace[]>;
    fillAlldata(id: number): Promise<workspace[]>;
    findOne(id: number): Promise<workspace>;
    findbyUser(request: Request): Promise<workspace>;
    create(createworkspaceData: workspace): Promise<workspace>;
    update(id: number, createworkspaceData: workspace): Promise<workspace>;
    delete(id: number): Promise<any>;
}
