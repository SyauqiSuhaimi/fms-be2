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
exports.WorkTradeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../auth/user.entity");
const workTrade_entity_1 = require("../entities/workTrade.entity");
const typeorm_2 = require("typeorm");
const xlsx = require("xlsx");
const fs = require("fs");
let WorkTradeService = class WorkTradeService {
    constructor(WorkTradeRepository, userRepository) {
        this.WorkTradeRepository = WorkTradeRepository;
        this.userRepository = userRepository;
    }
    findAll(data) {
        return this.WorkTradeRepository.find({ relations: ["company"] });
    }
    async findOne(condition) {
        return this.WorkTradeRepository.findOne(condition);
    }
    async findMany(condition) {
        return this.WorkTradeRepository.find(condition);
    }
    create(cases) {
        return this.WorkTradeRepository.save(cases);
    }
    async update(id, data) {
        return this.WorkTradeRepository.save(data);
    }
    async remove(id) {
        return this.WorkTradeRepository.delete(id);
    }
    async getbyuserID(id) {
        let data = await this.userRepository.findOne({
            where: { id: id },
            relations: ["worktrade", "grouplist.worktradelist"],
        });
        console.log(data);
        let n;
        let emptyarr = [];
        n = data["worktrade"] ? data["worktrade"].length : 0;
        for (let i = 0; i < n; i++) {
            emptyarr.push(data["worktrade"][i]);
        }
        n = data["grouplist"] ? data["grouplist"]["worktradelist"].length : 0;
        for (let i = 0; i < n; i++) {
            console.log(data["grouplist"]["worktradelist"][i]);
            emptyarr.push(data["grouplist"]["worktradelist"][i]);
        }
        console.log(emptyarr, n);
        let finalarr = [...new Set(emptyarr)];
        console.log(finalarr);
        return await finalarr;
    }
    async parseExcelFile(files, company) {
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
        const processedData = this.preProcessData(data, company);
        await this.saveData(processedData);
        console.log(processedData, "sini tgk data dia save ke x?");
    }
    preProcessData(data, company) {
        try {
            return data.map((item) => ({
                name: item.name,
                company: item.company || company,
            }));
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveData(processedData) {
        for (const item of processedData) {
            const worktrade = this.WorkTradeRepository.create(item);
            await this.WorkTradeRepository.save(worktrade);
        }
    }
};
WorkTradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workTrade_entity_1.WorkTrade)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WorkTradeService);
exports.WorkTradeService = WorkTradeService;
//# sourceMappingURL=worktrade.service.js.map