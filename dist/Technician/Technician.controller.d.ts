import { Request } from "express";
import { TechnicianService } from "./Technician.service";
import { Technician } from "../entities/technician.entity";
import { Case } from "../entities/case.entity";
import { JwtService } from "@nestjs/jwt";
import { NotificationsService } from "../notification/notification.service";
import { CasesGateway } from "../GatewayHandler/cases.gateway";
export declare class TechnicianController {
    private TechnicianService;
    private jwtService;
    private notificationsService;
    private casegateway;
    constructor(TechnicianService: TechnicianService, jwtService: JwtService, notificationsService: NotificationsService, casegateway: CasesGateway);
    fillAll(): Promise<Technician[]>;
    findOne(id: number): Promise<Technician>;
    create(request: Request, techlist: any, caseDetails: Case): Promise<string>;
    update(id: number, updateTechnicianData: Technician): Promise<Technician>;
    delete(id: number): Promise<{
        success: boolean;
    }>;
}
