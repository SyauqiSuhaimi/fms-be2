import { Request } from "express";
import { ContractService } from "./contract.service";
import { ServiceContract } from "../entities/serviceContract.entity";
import { JwtService } from "@nestjs/jwt";
export declare class ContractController {
    private contractService;
    private jwtService;
    constructor(contractService: ContractService, jwtService: JwtService);
    fillAll(): Promise<ServiceContract[]>;
    findByCompany(request: Request): Promise<ServiceContract[]>;
    findOne(id: number): Promise<ServiceContract>;
    create(createContractData: ServiceContract): Promise<ServiceContract>;
    update(id: number, createContractData: ServiceContract): Promise<ServiceContract>;
    delete(id: number): Promise<any>;
    getAll(request: Request, bodyData: any): Promise<any>;
}
