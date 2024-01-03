import { Eq_Brand } from "../entities/eq_brand.entity";
import { Repository } from "typeorm";
export declare class Eq_BrandService {
    private Eq_BrandRepository;
    constructor(Eq_BrandRepository: Repository<Eq_Brand>);
    findAll(): Promise<Eq_Brand[]>;
    findEq_Brand(condition: any): Promise<Eq_Brand[]>;
    findOne(condition: any): Promise<Eq_Brand>;
    create(data: Eq_Brand): Promise<Eq_Brand>;
    update(id: number, data: Eq_Brand): Promise<any>;
    remove(id: number): Promise<any>;
    brandByCompany(userId: any): Promise<Eq_Brand[]>;
}
