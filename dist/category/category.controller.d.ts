import { Response, Request } from "express";
import { categoryService } from "./category.service";
import { Category } from "../entities/category.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
export declare class categoryController {
    private categoryService;
    private jwtService;
    private GeneralService;
    constructor(categoryService: categoryService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<Category[]>;
    find(id: number): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    create(createData: Category): Promise<Category>;
    update(id: number, updateData: Category): Promise<Category>;
    delete(id: number): Promise<any>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    downloadexcel(res: Response): Promise<void>;
}
