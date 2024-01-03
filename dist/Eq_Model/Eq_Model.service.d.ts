import { Eq_Model } from "../entities/eq_model.entity";
import { Repository } from "typeorm";
export declare class Eq_ModelService {
    private Eq_ModelRepository;
    constructor(Eq_ModelRepository: Repository<Eq_Model>);
    findAll(): Promise<Eq_Model[]>;
    findEq_Model(condition: any): Promise<Eq_Model[]>;
    findOne(condition: any): Promise<Eq_Model>;
    create(data: Eq_Model): Promise<Eq_Model>;
    update(id: number, data: Eq_Model): Promise<any>;
    remove(id: number): Promise<any>;
    modelByCompany(userId: any): Promise<Eq_Model[]>;
}
