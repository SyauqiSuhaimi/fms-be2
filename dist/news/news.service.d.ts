import { Repository } from "typeorm";
import { News } from "../entities/news.entity";
export declare class NewsService {
    private NewsRepository;
    constructor(NewsRepository: Repository<News>);
    findAll(condition?: any): Promise<News[]>;
    findCase(condition: any): Promise<News[]>;
    findUnassigned(condition: any): Promise<News[]>;
    findOne(condition: any): Promise<News>;
    create(data: News): Promise<News>;
    update(id: number, data: News): Promise<any>;
    remove(id: number): Promise<any>;
    newsByUser(userId: any): Promise<News[]>;
    newsByCompany(companyId: any): Promise<News[]>;
    donwloadExcel(): Promise<unknown>;
    parseExcelFile(files: any, company: any, publisher: any): Promise<void>;
    strToEpoch(thedate: string): number;
    private preProcessData;
    private saveData;
}
