"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const case_service_1 = require("../case/case.service");
const notification_service_1 = require("../notification/notification.service");
const cases_gateway_1 = require("../GatewayHandler/cases.gateway");
const typeorm_1 = require("typeorm");
const auth_service_1 = require("../auth/auth.service");
let TasksService = TasksService_1 = class TasksService {
    constructor(schedulerRegistry, caseService, notificationsService, casegateway, userService) {
        this.schedulerRegistry = schedulerRegistry;
        this.caseService = caseService;
        this.notificationsService = notificationsService;
        this.casegateway = casegateway;
        this.userService = userService;
        this.logger = new common_1.Logger(TasksService_1.name);
        this.cronList = ["checkCriticalCases", "everyMonday"];
    }
    startCron(name) {
        console.log(name, "name");
        let namelist = [];
        if (name) {
            if (Array.isArray(name)) {
                console.log("Input is an array");
                namelist = name;
            }
            else if (typeof name === "string") {
                namelist = [name];
            }
        }
        else {
            namelist = this.cronList;
        }
        namelist.forEach((cronName) => {
            try {
                this.schedulerRegistry.addCronJob(cronName, this[cronName]);
                const cronJob = this.schedulerRegistry.getCronJob(cronName);
                console.log("Successfully added job", cronJob, cronName);
            }
            catch (error) {
                console.log("error", error);
            }
        });
    }
    stopCron(name) {
        console.log(name, "name");
        let namelist = [];
        if (name) {
            if (Array.isArray(name)) {
                console.log("Input is an array");
                namelist = name;
            }
            else if (typeof name === "string") {
                namelist = [name];
            }
        }
        else {
            namelist = this.cronList;
        }
        namelist.forEach((cronName) => {
            console.log("stop cronjob", cronName);
            try {
                const cronJob = this.schedulerRegistry.getCronJob(cronName);
                if (cronJob) {
                    this.schedulerRegistry.deleteCronJob(cronName);
                }
            }
            catch (error) {
                console.log(error, "error");
            }
        });
    }
    async checkCriticalCases() {
        this.logger.debug("Checking critical cases");
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const thirtyMinute = new Date(Date.now() - 30 * 60 * 1000);
        const thirtyMinuteTimestamp = Math.floor(thirtyMinute.getTime() / 1000);
        console.log(thirtyMinuteTimestamp, "time 2");
        this.logger.debug(thirtyMinuteTimestamp);
        this.logger.debug(fiveMinutesAgo);
        const currentTime = new Date();
        const startTimeCritical = new Date(currentTime.getTime() - 10 * 60 * 1000);
        const startTimeNonCritical = new Date(currentTime.getTime() - 30 * 60 * 1000);
        const criticalCases = await this.caseService.findCase({
            where: [
                {
                    case_status: { id: 2 || 3 },
                    equipment: { critical: true },
                    request_date: (0, typeorm_1.MoreThanOrEqual)(fiveMinutesAgo.getTime() / 1000),
                },
                {
                    case_status: { id: 2 || 3 },
                    equipment: { critical: false },
                    request_date: (0, typeorm_1.MoreThanOrEqual)(thirtyMinute.getTime() / 1000),
                    casetype: { id: (0, typeorm_1.Not)(1) },
                },
            ],
            relations: [
                "equipment",
                "case_status",
                "equipment.subarea",
                "casetype",
                "equipment.eq_type",
                "equipment.eq_classification",
                "equipment.eq_brand",
                "equipment.eq_model",
                "location.area.department",
            ],
        });
        console.log("case", criticalCases);
    }
    async everyMonday() {
        const data = await this.caseService.findCase({
            where: {
                technician: !null,
                casetype: { id: 1 },
            },
            relations: [
                "equipment",
                "case_status",
                "equipment.subarea",
                "casetype",
                "equipment.eq_type",
                "equipment.eq_classification",
                "equipment.eq_brand",
                "equipment.eq_model",
                "location.area.department",
                "technician",
                "technician.maintainer",
            ],
        });
        const currentWeekStart = new Date();
        currentWeekStart.setHours(0, 0, 0, 0);
        currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay() + 1);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
        data.forEach(async (caseData) => {
            const requestDate = new Date(caseData.request_date * 1000);
            if (requestDate >= currentWeekStart && requestDate <= currentWeekEnd) {
                caseData.technician.forEach(async (technician) => {
                    const technicianId = technician.id;
                    const technicianEmail = technician.maintainer;
                    delete technicianEmail.password;
                    const noti = await this.notificationsService.create({
                        name: "this week PPM",
                        user: technicianEmail,
                        cases: caseData.id,
                    });
                    this.logger.debug(caseData);
                    console.log(caseData, "Case Data:");
                    console.log("Technician ID:", technicianId);
                    console.log("Technician Email:", technicianEmail);
                    this.logger.debug("Technician Email:", technicianEmail);
                    this.casegateway.newnotify(technicianEmail, noti);
                    console.log("Notification created:", noti);
                });
            }
        });
    }
    getAll() {
        let joblist = this.schedulerRegistry.getCronJobs();
        console.log(joblist, "joblist");
    }
    setupCronJobs() {
        this.startCron();
    }
    disableCronJobs() {
        this.stopCron();
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS, { name: "checkCriticalCases" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "checkCriticalCases", null);
__decorate([
    (0, schedule_1.Cron)("0 9 * * 1", { name: "everyMonday" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "everyMonday", null);
TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(case_service_1.CaseService)),
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry,
        case_service_1.CaseService,
        notification_service_1.NotificationsService,
        cases_gateway_1.CasesGateway,
        auth_service_1.AuthService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=task.service.js.map