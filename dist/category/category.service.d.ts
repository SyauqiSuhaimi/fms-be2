import { Category } from "../entities/category.entity";
import { Repository } from "typeorm";
export declare class categoryService {
    private CategoryRepository;
    constructor(CategoryRepository: Repository<Category>);
    findAll(): Promise<Category[]>;
    find(condition: any): Promise<Category[]>;
    findOne(condition: any): Promise<Category>;
    create(data: Category): Promise<Category>;
    update(id: number, data: Category): Promise<any>;
    remove(id: number): Promise<any>;
    byCompany(userId: any): Promise<Category[]>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
