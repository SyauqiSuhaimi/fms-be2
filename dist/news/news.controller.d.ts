/// <reference types="multer" />
import { Response, Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { News } from "../entities/news.entity";
import { NewsService } from "./news.service";
import { GeneralService } from "../helper/general.service";
import { NotificationsService } from "../notification/notification.service";
import { CasesGateway } from "../GatewayHandler/cases.gateway";
export declare class NewsController {
    private newsService;
    private jwtService;
    private GeneralService;
    private AuthService;
    private notificationsService;
    private casegateway;
    constructor(newsService: NewsService, jwtService: JwtService, GeneralService: GeneralService, AuthService: AuthService, notificationsService: NotificationsService, casegateway: CasesGateway);
    findAll(request: Request): Promise<News[]>;
    byCompany(request: Request, id: number): Promise<News[]>;
    byCompany2(request: Request, id: number): Promise<News[]>;
    findOne(id: number): Promise<News>;
    create(createNewsData: News): Promise<News>;
    update(id: number, updateCaseData: News): Promise<News>;
    delete(id: number): Promise<any>;
    uploadFiles(body: any, files: Array<Express.Multer.File>): void;
    createcase(body: any, files: Array<Express.Multer.File>, request: Request): Promise<News>;
    uploadfile(files: any): string;
    downloadexcel(res: Response): Promise<void>;
    epochtodate(d: number): string;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    uploadFile(body: any, files: any, request: Request): Promise<void>;
}
