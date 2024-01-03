import { Eq_ModelService } from "./Eq_Model.service";
import { Eq_Model } from "../entities/eq_model.entity";
export declare class Eq_ModelController {
    private Eq_ModelService;
    constructor(Eq_ModelService: Eq_ModelService);
    fillAll(): Promise<Eq_Model[]>;
    findEq_Model(id: number): Promise<Eq_Model[]>;
    findOne(id: number): Promise<Eq_Model>;
    create(createEq_ModelData: Eq_Model): Promise<Eq_Model>;
    update(id: number, updateEq_ModelData: Eq_Model): Promise<Eq_Model>;
    delete(id: number): Promise<any>;
}
