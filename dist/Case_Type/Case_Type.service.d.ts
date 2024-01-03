import { User } from "../auth/user.entity";
import { CaseType } from "../entities/caseType.entity";
import { Repository } from "typeorm";
export declare class CaseTypeService {
    private CaseTypeRepository;
    private readonly userRepository;
    constructor(CaseTypeRepository: Repository<CaseType>, userRepository: Repository<User>);
    findAll(): Promise<CaseType[]>;
    findAllC(id: number, usertype: string): Promise<CaseType[]>;
    findCondition(condition: any): Promise<CaseType[]>;
    findbyUser(condition: any): Promise<CaseType[]>;
    findOne(condition: any): Promise<CaseType>;
    create(data: CaseType): Promise<CaseType>;
    update(id: number, data: CaseType): Promise<any>;
    remove(id: number): Promise<any>;
}
