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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonModule = void 0;
const common_1 = require("@nestjs/common");
const winston = require("winston");
const path = require("path");
const common_2 = require("@nestjs/common");
const DailyRotateFile = require("winston-daily-rotate-file");
let WinstonModule = class WinstonModule {
    use(req, res, next) {
        const { method, originalUrl, body } = req;
        let logger = winston.createLogger({
            format: winston.format.json(),
            transports: [
                new DailyRotateFile({
                    dirname: path.resolve(__dirname, "../../system_logs"),
                    filename: "application-%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    zippedArchive: true,
                    maxSize: "20m",
                    maxFiles: "14d",
                }),
            ],
        });
        const profiler = logger.startTimer();
        const currentDate = new Date();
        logger.info(`${currentDate} : Start: ${method} ${originalUrl} / Body : ${JSON.stringify(body)}`);
        res.on("finish", () => {
            const { statusCode } = res;
            const currentDate2 = new Date();
            profiler.done({
                message: `${currentDate2} : ${method} ${originalUrl} ${statusCode}`,
                level: statusCode >= 500 ? "error" : "info",
            });
        });
        next();
    }
};
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], WinstonModule.prototype, "use", null);
WinstonModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: "winston",
                useFactory: () => {
                    return winston.createLogger({
                        format: winston.format.json(),
                        transports: [
                            new DailyRotateFile({
                                dirname: path.resolve(__dirname, "../../system_logs"),
                                filename: "application-%DATE%.log",
                                datePattern: "YYYY-MM-DD",
                                zippedArchive: true,
                                maxSize: "20m",
                                maxFiles: "14d",
                            }),
                        ],
                    });
                },
            },
        ],
        exports: ["winston"],
    }),
    (0, common_2.Injectable)()
], WinstonModule);
exports.WinstonModule = WinstonModule;
//# sourceMappingURL=winston.module.js.map