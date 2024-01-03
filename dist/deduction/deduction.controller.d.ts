import { JwtService } from "@nestjs/jwt";
import { DeductionService } from "./deduction.service";
import { Deduction } from "../entities/deduction.entity";
export declare class DeductionController {
    private DeductionService;
    private jwtService;
    constructor(DeductionService: DeductionService, jwtService: JwtService);
    fillAll(): Promise<Deduction[]>;
    findOne(id: number): Promise<Deduction>;
    create(createDeductionData: Deduction): Promise<Deduction>;
    update(id: number, createDeductionData: Deduction): Promise<Deduction>;
    delete(id: number): Promise<any>;
}
