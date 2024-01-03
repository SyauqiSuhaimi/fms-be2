import { Repository } from 'typeorm';
import { Deduction } from '../entities/deduction.entity';
export declare class DeductionService {
    private DeductionRepository;
    constructor(DeductionRepository: Repository<Deduction>);
    findAll(): Promise<Deduction[]>;
    findCompany(condition: any): Promise<Deduction[]>;
    findOne(condition: any): Promise<Deduction>;
    create(cases: Deduction): Promise<Deduction>;
    update(id: number, data: Deduction): Promise<any>;
    remove(id: number): Promise<any>;
}
