"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const task_service_1 = require("./task.service");
const cron_module_1 = require("./cron.module");
console.log("CRON JOB IS RUNNING");
core_1.NestFactory.create(cron_module_1.CronModule).then(async (app) => {
    await app.init();
    const cronService = app.get(task_service_1.TasksService);
    cronService.getAll();
});
//# sourceMappingURL=cron.main.js.map