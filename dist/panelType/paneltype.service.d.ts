import { Repository } from "typeorm";
import { PanelType } from "../entities/paneltype.entity";
export declare class PanelTypeService {
    private PanelTypeRepository;
    constructor(PanelTypeRepository: Repository<PanelType>);
    findAll(): Promise<PanelType[]>;
    findPanelType(condition: any): Promise<PanelType[]>;
    findOne(condition: any): Promise<PanelType>;
    create(data: PanelType): Promise<PanelType>;
    update(id: number, data: PanelType): Promise<any>;
    remove(id: number): Promise<any>;
}
