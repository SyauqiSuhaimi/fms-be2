import { defect } from '../entities/defect.entity';
import { Repository } from 'typeorm';
export declare class defectService {
    private defectRepository;
    constructor(defectRepository: Repository<defect>);
    findAll(): Promise<defect[]>;
    findCompany(condition: any): Promise<defect[]>;
    findOne(condition: any): Promise<defect>;
    create(cases: defect): Promise<defect>;
    update(id: number, data: defect): Promise<any>;
    remove(id: number): Promise<any>;
}
