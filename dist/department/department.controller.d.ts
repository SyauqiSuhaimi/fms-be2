import { Response, Request } from "express";
import { DepartmentService } from "./department.service";
import { Department } from "../entities/department.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class DepartmentController {
    private DepartmentService;
    private jwtService;
    private GeneralService;
    constructor(DepartmentService: DepartmentService, jwtService: JwtService, GeneralService: GeneralService);
    findAll(): Promise<Department[]>;
    fillAll(id: number, request: Request): Promise<any[]>;
    byUser(request: Request): Promise<Department[]>;
    findOne(id: number): Promise<Department>;
    create(createDepartmentData: Department): Promise<Department>;
    update(id: number, createDepartmentData: Department): Promise<Department>;
    delete(id: number): Promise<{
        affected: number;
    }>;
    downloadexcel(res: Response): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
}
