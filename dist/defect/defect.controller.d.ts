import { JwtService } from "@nestjs/jwt";
import { defectService } from "./defect.service";
import { defect } from "../entities/defect.entity";
export declare class defectController {
    private defectService;
    private jwtService;
    constructor(defectService: defectService, jwtService: JwtService);
    fillAll(): Promise<defect[]>;
    findOne(id: number): Promise<defect>;
    create(createdefectData: defect): Promise<defect>;
    update(id: number, createdefectData: defect): Promise<defect>;
    delete(id: number): Promise<any>;
}
