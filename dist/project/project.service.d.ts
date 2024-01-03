import { project } from '../entities/project.entity';
import { Repository } from 'typeorm';
export declare class projectService {
    private projectRepository;
    constructor(projectRepository: Repository<project>);
    findAll(): Promise<project[]>;
    findCompany(condition: any): Promise<project[]>;
    findOne(condition: any): Promise<project>;
    create(cases: project): Promise<project>;
    update(id: number, data: project): Promise<any>;
    remove(id: number): Promise<any>;
}
