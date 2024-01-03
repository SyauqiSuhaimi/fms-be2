/// <reference types="multer" />
import { Request } from "express";
import { CompanyService } from "./company.service";
import { Company } from "../entities/company.entity";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { asset_statusService } from "../asset_status/asset_status.service";
export declare class CompanyController {
    private CompanyService;
    private jwtService;
    private readonly authService;
    private asset_statusService;
    constructor(CompanyService: CompanyService, jwtService: JwtService, authService: AuthService, asset_statusService: asset_statusService);
    geteqData(request: Request): Promise<{
        eq_brand: import("../entities/eq_brand.entity").Eq_Brand[];
        eq_type: import("../entities/eq_type.entity").Eq_Type[];
        eq_class: import("../entities/eq_classification.entity").Eq_Classifications[];
        groupList: import("../entities/groupList.entity").GroupList[];
        deptList: import("../entities/department.entity").Department[];
        asset_statusList: import("../entities/asset_status.entity").Asset_Status[];
        servicecontractList: import("../entities/serviceContract.entity").ServiceContract[];
        mdaList: import("../entities/mda.entity").mda[];
        category: import("../entities/category.entity").Category[];
    }>;
    fillAll(): Promise<Company[]>;
    fillAlldata(id: number): Promise<Company[]>;
    findOne(id: number): Promise<Company>;
    findbyUser(request: Request): Promise<Company>;
    create(createCompanyData: Company): Promise<Company>;
    update(id: number, createCompanyData: Company): Promise<Company>;
    delete(id: number): Promise<any>;
    createCompany(createCompanyData: Company): Promise<Company>;
    uploadworkorder(body: any, files: Array<Express.Multer.File>): Promise<{
        success: boolean;
        msg: string;
    }>;
}
