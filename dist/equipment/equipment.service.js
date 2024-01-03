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
exports.EquipmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const xlsx = require("xlsx");
const fs = require("fs");
const equipment_entity_1 = require("../entities/equipment.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../auth/user.entity");
const equipment_history_service_1 = require("../equipment_history/equipment_history.service");
let EquipmentService = class EquipmentService {
    constructor(equipmentRepository, userRepository, Equipment_HistoryService) {
        this.equipmentRepository = equipmentRepository;
        this.userRepository = userRepository;
        this.Equipment_HistoryService = Equipment_HistoryService;
    }
    findAll(data) {
        return this.equipmentRepository.find({
            relations: [
                "worktrade",
                "subarea",
                "subarea.area",
                "department",
                "department.area",
                "subarea.area.subarea",
                "worktrade.grouplist",
                "worktrade.grouplist.worktradelist",
                "eq_type",
                "eq_classification",
                "eq_brand",
                "eq_model",
            ],
        });
    }
    async findEquipment(condition) {
        return this.equipmentRepository.find(condition);
    }
    async findOne(condition) {
        return this.equipmentRepository.findOne(condition);
    }
    async create(body) {
        let newHistory = {
            id: 0,
            eqhistory_name: "Create Equipment",
            time: body.purchase_date,
            Equipment_Status: body.status,
            equipment: body,
            equipmenthistorystatus: body,
        };
        delete body.status;
        const response = await this.equipmentRepository.save(body);
        if (response) {
            response.status = await this.Equipment_HistoryService.create(newHistory);
            await this.update(response.id, response);
            return response;
        }
        else {
            throw new Error("Something went wrong on the server. Please contact the administrator for assistance.");
        }
    }
    async update(id, cases) {
        return this.equipmentRepository.save(cases);
    }
    async update2(id, eq) {
        return this.equipmentRepository.update(id, eq);
    }
    async remove(id) {
        return await this.equipmentRepository.delete({ id: id });
    }
    async getbyuserID(id) {
        let data = await this.userRepository.findOne({
            where: { id: id },
            relations: ["worktrade"],
        });
        let n;
        let emptyarr = [];
        console.log(data["worktrade"][0]);
        n = data["worktrade"] ? data["worktrade"].length : 0;
        for (let i = 0; i < n; i++) {
            emptyarr.push(data["worktrade"][i]["id"]);
        }
        n = data["grouplist"] ? data["grouplist"]["worktradelist"].length : 0;
        for (let i = 0; i < n; i++) {
            emptyarr.push(data["grouplist"]["worktradelist"][i]["id"]);
        }
        console.log(emptyarr, n);
        let finalarr = [...new Set(emptyarr)];
        console.log(finalarr);
        return await this.equipmentRepository.find({
            where: { company: { user: { id: data["id"] } }, worktrade: (0, typeorm_2.In)(finalarr) },
            relations: [
                "subarea.area",
                "department.area",
                "eq_type",
                "eq_classification",
                "eq_brand",
                "eq_model",
                "worktrade.grouplist.worktradelist",
                "disposal_status",
                "vo_status",
                "eq_category",
                "asset_group",
                "mda",
                "project",
            ],
        });
    }
    async parseExcelFile(files, company) {
        if (!files || files.length === 0) {
            console.error("No files passed to parseExcelFile function");
            return;
        }
        const file = files[0].path;
        const workbook = xlsx.read(fs.readFileSync(file).toString("binary"), {
            type: "binary",
        });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(worksheet);
        const processedData = this.preProcessData(data, company);
        await this.saveData(processedData);
    }
    preProcessData(data, company) {
        console.log("manu", data[0].manufacturing_date, this.changeDate(data[0].manufacturing_date));
        try {
            return data.map((item) => ({
                name: item.name,
                serial_number: item.serial_number,
                asset_number: item.asset_number,
                eq_type: item.eq_type,
                eq_classification: item.eq_classification,
                eq_brand: item.eq_brand,
                eq_model: item.eq_model,
                purchase_date: item.purchase_date > 0 ? this.changeDate(item.purchase_date) : 0,
                tc_Date: item.tc_Date > 0 ? this.changeDate(item.tc_Date) : 0,
                product_cost: item.product_cost,
                accessories: item.accessories,
                company: item.company || company,
                department: item.department,
                worktrade: item.worktrade,
                subarea: item.subarea,
                description: item.description,
                sjsb_no: item.sjsb_no,
                lifespan: item.lifespan,
                manufacture: item.manufacture,
                maker: item.maker,
                registration_no: item.registration_no,
                chassis_no: item.chassis_no,
                engine_no: item.engine_no,
                engine_capacity: item.engine_capacity,
                fuel_type: item.fuel_type,
                current_meter_reading: item.current_meter_reading,
                manufacturing_date: item.manufacturing_date > 0
                    ? this.changeDate(item.manufacturing_date)
                    : 0,
                software_version_key: item.software_version_key,
                power_specification: item.power_specification,
                volt: item.volt,
                asset_status: item.asset_status,
                routine: item.routine,
                calibration: item.calibration,
                maintenance_category: item.maintenance_category,
                nominated_contractor: item.nominated_contractor,
                last_work_order_no: item.last_work_order_no,
                last_service_work_no: item.last_service_work_no,
                last_work_date: item.last_work_date > 0 ? this.changeDate(item.last_work_date) : 0,
                last_service_date: item.last_service_date > 0
                    ? this.changeDate(item.last_service_date)
                    : 0,
                warranty_start: item.warranty_start > 0 ? this.changeDate(item.warranty_start) : 0,
                warranty_end: item.warranty_end > 0 ? this.changeDate(item.warranty_end) : 0,
                age: item.age,
                year_service: item.year_service,
                commision_date: item.commision_date > 0 ? this.changeDate(item.commision_date) : 0,
                eq_category: item.eq_category,
                asset_group: item.asset_group,
            }));
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveData(processedData) {
        for (const item of processedData) {
            const equipment = this.equipmentRepository.create(item);
            await this.equipmentRepository.save(equipment);
        }
    }
    changeDate(excelSerialDate) {
        const excelEpochStartDate = new Date("1900-01-01T00:00:00Z");
        const unixTimestamp = excelEpochStartDate.getTime() +
            (excelSerialDate - 2) * 24 * 60 * 60 * 1000;
        const unixTimestampInSeconds = Math.floor(unixTimestamp / 1000);
        return Math.max(0, unixTimestampInSeconds);
    }
};
EquipmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_entity_1.Equipment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        equipment_history_service_1.Equipment_HistoryService])
], EquipmentService);
exports.EquipmentService = EquipmentService;
//# sourceMappingURL=equipment.service.js.map