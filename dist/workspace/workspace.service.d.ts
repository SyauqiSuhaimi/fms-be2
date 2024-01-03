import { workspace } from '../entities/workspace.entity';
import { Repository } from 'typeorm';
export declare class WorkspaceService {
    private workspaceRepository;
    constructor(workspaceRepository: Repository<workspace>);
    findAll(): Promise<workspace[]>;
    findCompany(condition: any): Promise<workspace[]>;
    findOne(condition: any): Promise<workspace>;
    create(cases: workspace): Promise<workspace>;
    update(id: number, data: workspace): Promise<any>;
    remove(id: number): Promise<any>;
}
