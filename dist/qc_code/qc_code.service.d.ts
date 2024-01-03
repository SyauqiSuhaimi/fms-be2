import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Qc_codeEntity } from '../entities/qc_code.entity';
export declare class Qc_codeService extends TypeOrmCrudService<Qc_codeEntity> {
    constructor(repo: any);
}
