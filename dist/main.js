"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("./TaskScheduling/task.service");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const cases_gateway_1 = require("./GatewayHandler/cases.gateway");
const bodyParser = require("body-parser");
const winston = require("winston");
async function bootstrap() {
    var whitelist = [
        " 127.0.0.1",
        "web-module://api-client.app",
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:8081",
        "https://myces-fms.com",
        "http://myces-fms.com",
        "https://www.myces-fms.com",
        "http://www.myces-fms.com",
        "http://54.255.251.129",
    ];
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                console.log(origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    });
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type,  Accept");
        next();
    });
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    console.log("Quack");
    process.on("uncaughtException", (err) => {
        winston.error("Uncaught exception", err);
    });
    process.on("unhandledRejection", (reason, promise) => {
        winston.error("Unhandled Rejection at:", promise, "reason:", reason);
    });
    await app.listen(3002);
    console.log("asasasasasasdfjshjfddfsdsdfksdfskdlsh390434-0u");
    const cronService = app.get(task_service_1.TasksService);
    cronService.disableCronJobs();
    const socketGateway = app.get(cases_gateway_1.CasesGateway);
}
bootstrap();
//# sourceMappingURL=main.js.map