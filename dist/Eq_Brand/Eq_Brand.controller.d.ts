import { Response } from "express";
import { Eq_BrandService } from "./Eq_Brand.service";
import { Eq_Brand } from "../entities/eq_brand.entity";
import { Eq_ModelService } from "../Eq_Model/Eq_Model.service";
import { GeneralService } from "../helper/general.service";
export declare class Eq_BrandController {
    private Eq_BrandService;
    private Eq_Model;
    private GeneralService;
    constructor(Eq_BrandService: Eq_BrandService, Eq_Model: Eq_ModelService, GeneralService: GeneralService);
    fillAll(): Promise<Eq_Brand[]>;
    findEq_Brand(id: number): Promise<Eq_Brand[]>;
    findOne(id: number): Promise<Eq_Brand>;
    create(createEq_BrandData: Eq_Brand): Promise<Eq_Brand>;
    update(id: number, updateEq_BrandData: Eq_Brand): Promise<Eq_Brand>;
    delete(id: number): Promise<any>;
    brandModel(id: number): Promise<{
        eq_brand: Eq_Brand[];
        eq_model: import("../entities/eq_model.entity").Eq_Model[];
    }>;
    testdownloadExcelData(res: Response): Promise<void>;
}
