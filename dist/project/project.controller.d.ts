import { JwtService } from "@nestjs/jwt";
import { projectService } from "./project.service";
import { project } from "../entities/project.entity";
export declare class projectController {
    private projectService;
    private jwtService;
    constructor(projectService: projectService, jwtService: JwtService);
    fillAll(): Promise<project[]>;
    findOne(id: number): Promise<project>;
    create(createprojectData: project): Promise<project>;
    update(id: number, createprojectData: project): Promise<project>;
    delete(id: number): Promise<any>;
}
