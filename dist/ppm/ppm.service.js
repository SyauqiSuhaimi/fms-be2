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
exports.PPMService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ppm_entity_1 = require("../entities/ppm.entity");
const holiday_service_1 = require("../holiday/holiday.service");
const typeorm_2 = require("typeorm");
const xlsx = require("xlsx");
const fs = require("fs");
const moment = require("moment");
let PPMService = class PPMService {
    constructor(HolidayService, PpmRepository) {
        this.HolidayService = HolidayService;
        this.PpmRepository = PpmRepository;
    }
    async findAll(condition) {
        return this.PpmRepository.find(condition);
    }
    async findOne(condition) {
        return this.PpmRepository.findOne(condition);
    }
    create(data) {
        return this.PpmRepository.save(data);
    }
    async update(id, data) {
        return this.PpmRepository.save(data);
    }
    async remove(id) {
        return this.PpmRepository.delete(id);
    }
    async dataForPPM(userData, eqId) {
        const holiday = await this.HolidayService.byCompany(userData);
        console.log("as", eqId);
        let ppmList = null;
        if (eqId.length > 0) {
            ppmList = await this.findAll({
                where: { equipment: (0, typeorm_2.In)(eqId) },
                relations: [
                    "equipment",
                    "equipment.worktrade",
                    "equipment.subarea",
                    "equipment.department",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                    "cases",
                    "cases.casetype",
                    "ppmchecklist",
                ],
            });
        }
        else {
            ppmList = await this.findAll({
                where: { equipment: { company: { user: { id: userData["id"] } } } },
                relations: [
                    "equipment",
                    "equipment.worktrade",
                    "equipment.subarea",
                    "equipment.department",
                    "equipment.eq_type",
                    "equipment.eq_classification",
                    "equipment.eq_brand",
                    "equipment.eq_model",
                    "cases",
                    "cases.casetype",
                    "ppmchecklist",
                ],
            });
        }
        return {
            holiday: holiday,
            ppmList: ppmList,
        };
    }
    async parseExcelFile(files) {
        if (!files || files.length === 0) {
            console.error("No files passed to parseExcelFile function");
            return;
        }
        const file = files[0].path;
        console.log(file, "sini tgk apa keluar");
        const workbook = xlsx.read(fs.readFileSync(file).toString("binary"), {
            type: "binary",
        });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(worksheet);
        console.log(data, "sini nak nk tengok data yg dah read");
        const processedData = this.preProcessData(data);
        await this.saveData(processedData);
        console.log(processedData, "sini tgk data dia save ke x?");
    }
    strToEpoch(thedate) {
        const date = moment(thedate, "DD/MM/YYYY,  h:mm:ss A");
        if (!date.isValid()) {
            console.error("Invalid date format:", thedate);
            return null;
        }
        return date.unix();
    }
    preProcessData(data) {
        try {
            return data.map((item) => ({
                name: item.name,
                description: item.description,
                interval: this.strToEpoch(item.interval),
                onholiday: item.onholiday,
                task: item.task,
                start_date: item.start_date,
                priority: item.priority,
                replaceable: item.replaceable,
                expected_duration: item.expected_duration,
                precision: item.precision,
            }));
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveData(processedData) {
        for (const item of processedData) {
            const ppm = this.PpmRepository.create(item);
            await this.PpmRepository.save(ppm);
        }
    }
};
PPMService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(ppm_entity_1.PPM)),
    __metadata("design:paramtypes", [holiday_service_1.HolidayService,
        typeorm_2.Repository])
], PPMService);
exports.PPMService = PPMService;
//# sourceMappingURL=ppm.service.js.map