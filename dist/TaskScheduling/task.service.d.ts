import { SchedulerRegistry } from "@nestjs/schedule";
import { CaseService } from "../case/case.service";
import { NotificationsService } from "../notification/notification.service";
import { CasesGateway } from "../GatewayHandler/cases.gateway";
import { AuthService } from "../auth/auth.service";
export declare class TasksService {
    private schedulerRegistry;
    private readonly caseService;
    private readonly notificationsService;
    private readonly casegateway;
    private readonly userService;
    private readonly logger;
    private cronList;
    constructor(schedulerRegistry: SchedulerRegistry, caseService: CaseService, notificationsService: NotificationsService, casegateway: CasesGateway, userService: AuthService);
    startCron(name?: string | string[] | null): void;
    stopCron(name?: string | string[] | null): void;
    checkCriticalCases(): Promise<void>;
    everyMonday(): Promise<void>;
    getAll(): void;
    setupCronJobs(): void;
    disableCronJobs(): void;
}
