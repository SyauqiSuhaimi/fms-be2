import { Eq_Type } from "../entities/eq_type.entity";
import { Repository } from "typeorm";
export declare class Eq_TypeService {
    private Eq_TypeRepository;
    constructor(Eq_TypeRepository: Repository<Eq_Type>);
    findAll(): Promise<Eq_Type[]>;
    findEq_Type(condition: any): Promise<Eq_Type[]>;
    findOne(condition: any): Promise<Eq_Type>;
    create(data: Eq_Type): Promise<Eq_Type>;
    update(data: Eq_Type): Promise<any>;
    remove(id: number): Promise<any>;
    typeByCompany(userId: any): Promise<Eq_Type[]>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
