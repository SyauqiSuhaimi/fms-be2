import { Technician } from "../entities/technician.entity";
import { Repository } from "typeorm";
export declare class TechnicianService {
    private TechnicianRepository;
    constructor(TechnicianRepository: Repository<Technician>);
    findAll(condition: any): Promise<Technician[]>;
    findOne(condition: any): Promise<Technician>;
    create(cases: Technician): Promise<Technician>;
    update(id: number, cases: Technician): Promise<any>;
    remove(id: number): Promise<any>;
}
