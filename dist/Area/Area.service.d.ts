import { Area } from "../entities/area.entity";
import { Repository } from "typeorm";
export declare class AreaService {
    private AreaRepository;
    constructor(AreaRepository: Repository<Area>);
    findAll(): Promise<Area[]>;
    findArea(condition: any): Promise<Area[]>;
    findOne(condition: any): Promise<Area>;
    create(data: Area): Promise<Area>;
    update(id: number, data: Area): Promise<any>;
    remove(id: number): Promise<any>;
    downloadexceldata(): Promise<unknown>;
    private styleSheet;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
