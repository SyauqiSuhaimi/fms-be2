import { ServiceContract } from "../entities/serviceContract.entity";
import { Repository } from "typeorm";
export declare class ContractService {
    private ServiceContractRepository;
    constructor(ServiceContractRepository: Repository<ServiceContract>);
    findAll(): Promise<ServiceContract[]>;
    findOne(condition: any): Promise<ServiceContract>;
    findMany(condition: any): Promise<ServiceContract[]>;
    create(data: ServiceContract): Promise<ServiceContract>;
    update(id: number, data: ServiceContract): Promise<any>;
    remove(id: number): Promise<any>;
}
