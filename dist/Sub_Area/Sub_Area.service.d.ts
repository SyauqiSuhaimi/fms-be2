import { SubArea } from "../entities/subArea.entity";
import { Repository } from "typeorm";
export declare class SubAreaService {
    private subAreaRepository;
    constructor(subAreaRepository: Repository<SubArea>);
    findAll(): Promise<SubArea[]>;
    findSubArea(condition: any): Promise<SubArea[]>;
    findOne(condition: any): Promise<SubArea>;
    create(data: SubArea): Promise<SubArea>;
    update(id: number, data: SubArea): Promise<any>;
    remove(id: number): Promise<any>;
    parseExcelFile(files: any): Promise<void>;
    private preProcessData;
    private saveData;
}
