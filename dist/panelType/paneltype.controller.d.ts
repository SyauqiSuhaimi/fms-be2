import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
import { PanelType } from "../entities/paneltype.entity";
import { PanelTypeService } from "../panelType/paneltype.service";
export declare class PanelTypeController {
    private PanelTypeService;
    private jwtService;
    private GeneralService;
    constructor(PanelTypeService: PanelTypeService, jwtService: JwtService, GeneralService: GeneralService);
    fillAll(): Promise<PanelType[]>;
    findOne(id: number): Promise<PanelType>;
    create(createPaneltypeData: PanelType): Promise<PanelType>;
    update(id: number, updatePanelTypeData: PanelType): Promise<PanelType>;
    delete(id: number): Promise<any>;
}
