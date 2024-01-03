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
exports.GroupListService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const groupList_entity_1 = require("../entities/groupList.entity");
const typeorm_2 = require("typeorm");
const xlsx = require("xlsx");
const fs = require("fs");
const workTrade_entity_1 = require("../entities/workTrade.entity");
let GroupListService = class GroupListService {
    constructor(groupListRepository, WorkTradeRepository) {
        this.groupListRepository = groupListRepository;
        this.WorkTradeRepository = WorkTradeRepository;
    }
    findAll() {
        return this.groupListRepository.find({
            relations: ["company", "worktradelist", "worktradelist.eq_type"],
        });
    }
    async findall(condition) {
        return this.groupListRepository.find(condition);
    }
    async findOne(condition) {
        return this.groupListRepository.findOne(condition);
    }
    create(data) {
        return this.groupListRepository.save(data);
    }
    async update(id, data) {
        return this.groupListRepository.save(data);
    }
    async remove(id) {
        return this.groupListRepository.delete(id);
    }
    async findMany(condition) {
        return this.groupListRepository.find(condition);
    }
    async groupByCompany(userId) {
        return this.groupListRepository.find({
            where: { company: { user: { id: userId["id"] } } },
            relations: ["worktradelist", "worktradelist.eq_type"],
        });
    }
    async parseExceltestFile(files, company) {
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
        const processedData = await this.preProcessData(data, company);
        await this.saveData(processedData);
        console.log(processedData, "sini tgk data dia save ke x?");
    }
    preProcessData(data, company) {
        let newdata = data.map((item) => {
            let arr1 = item.worktradelist.replace(/\s+/g, "").split(", ");
            return {
                name: item.name,
                worktradelist: arr1,
                company: item.company || company,
            };
        });
        console.log(newdata, "newdata");
        return newdata;
    }
    async saveData(processedData) {
        const responses = [];
        for (const item of processedData) {
            const workTradeNames = item.worktradelist;
            console.log(workTradeNames, "wtname");
            const workTrades = await this.WorkTradeRepository.find({
                where: { name: (0, typeorm_2.In)(workTradeNames) },
            });
            console.log(workTrades, "sini tgk id");
            const groupList = this.groupListRepository.create({
                name: item.name,
                company: item.company,
                worktradelist: workTrades,
            });
            const response = await this.groupListRepository.save(groupList);
            responses.push(response);
        }
        return responses;
    }
};
GroupListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(groupList_entity_1.GroupList)),
    __param(1, (0, typeorm_1.InjectRepository)(workTrade_entity_1.WorkTrade)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GroupListService);
exports.GroupListService = GroupListService;
//# sourceMappingURL=group_list.service.js.map