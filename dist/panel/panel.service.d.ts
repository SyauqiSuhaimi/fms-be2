import { Panel } from '../entities/panel.entity';
import { Repository } from 'typeorm';
export declare class PanelService {
    private PanelRepository;
    constructor(PanelRepository: Repository<Panel>);
    findAll(): Promise<Panel[]>;
    findCompany(condition: any): Promise<Panel[]>;
    findOne(condition: any): Promise<Panel>;
    create(cases: Panel): Promise<Panel>;
    update(id: number, data: Panel): Promise<any>;
    remove(id: number): Promise<any>;
}
