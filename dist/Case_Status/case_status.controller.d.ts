import { Case_StatusService } from "./case_status.service";
import { Case_Status } from "../entities/case_status.entity";
export declare class Case_StatusController {
    private Case_StatusService;
    constructor(Case_StatusService: Case_StatusService);
    fillAll(): Promise<Case_Status[]>;
    findOne(id: number): Promise<Case_Status>;
    create(Case_StatusData: Case_Status): Promise<Case_Status>;
    update(id: number, Case_StatusData: Case_Status): Promise<Case_Status>;
    delete(id: number): Promise<{
        success: boolean;
    }>;
}
