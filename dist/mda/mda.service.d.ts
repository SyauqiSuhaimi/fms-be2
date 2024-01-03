import { mda } from "../entities/mda.entity";
import { Repository } from "typeorm";
export declare class mdaService {
    private mdaRepository;
    constructor(mdaRepository: Repository<mda>);
    findAll(): Promise<mda[]>;
    findMany(condition: any): Promise<mda[]>;
    findOne(condition: any): Promise<mda>;
    create(cases: mda): Promise<mda>;
    update(id: number, data: mda): Promise<any>;
    remove(id: number): Promise<any>;
}
