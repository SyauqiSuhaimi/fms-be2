import { Department } from "../entities/department.entity";
import { Repository } from "typeorm";
export declare class DepartmentService {
    private DepartmentRepository;
    constructor(DepartmentRepository: Repository<Department>);
    findAll(): Promise<Department[]>;
    findDepartment(condition: any): Promise<Department[]>;
    findOne(condition: any): Promise<Department>;
    create(cases: Department): Promise<Department>;
    update(id: number, cases: Department): Promise<any>;
    remove(id: number): Promise<any>;
    donwloadExcel(): Promise<unknown>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
    createQueryBuilder(): Promise<import("typeorm").SelectQueryBuilder<Department>>;
}
