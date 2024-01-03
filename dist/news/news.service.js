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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const typeorm_2 = require("typeorm");
const news_entity_1 = require("../entities/news.entity");
const tmp = require("tmp");
const xlsx = require("xlsx");
const fs = require("fs");
const dataN_1 = require("./dataN");
const moment = require("moment");
let NewsService = class NewsService {
    constructor(NewsRepository) {
        this.NewsRepository = NewsRepository;
    }
    findAll(condition = {}) {
        return this.NewsRepository.find(condition);
    }
    async findCase(condition) {
        return this.NewsRepository.find(condition);
    }
    async findUnassigned(condition) {
        return this.NewsRepository.query(condition);
    }
    async findOne(condition) {
        return this.NewsRepository.findOne(condition);
    }
    create(data) {
        return this.NewsRepository.save(data);
    }
    async update(id, data) {
        return this.NewsRepository.update(id, data);
    }
    async remove(id) {
        return this.NewsRepository.delete(id);
    }
    async newsByUser(userId) {
        const response = await this.NewsRepository.find({
            where: { company: { user: { id: userId["id"] } } },
            relations: ["publisher"],
        });
        response.forEach((item) => delete item.publisher.password);
        return response;
    }
    async newsByCompany(companyId) {
        const response = await this.NewsRepository.find({
            where: { company: { id: companyId } },
            relations: ["publisher"],
        });
        response.forEach((item) => delete item.publisher.password);
        return response;
    }
    async donwloadExcel() {
        if (!dataN_1.data) {
            throw new common_1.NotFoundException("no data download");
        }
        let rows = [];
        console.log(dataN_1.data);
        dataN_1.data.forEach((doc) => {
            rows.push(Object.values(doc));
        });
        let book = new exceljs_1.Workbook();
        let sheet = book.addWorksheet("sheet1");
        rows.unshift(Object.keys(dataN_1.data[0]));
        sheet.addRows(rows);
        let file = await new Promise((resolve, rejects) => {
            tmp.file({
                discardDrescriptor: true,
                prefix: `template`,
                postfix: ".xlsx",
                mode: parseInt("0600", 8),
            }, async (err, file) => {
                if (err)
                    throw new common_1.BadRequestException(err);
                book.xlsx
                    .writeFile(file)
                    .then((_) => {
                    resolve(file);
                })
                    .catch((err) => {
                    throw new common_1.BadRequestException(err);
                });
            });
        });
        return file;
    }
    async parseExcelFile(files, company, publisher) {
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
        const processedData = this.preProcessData(data, company, publisher);
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
    preProcessData(data, company, publisher) {
        try {
            return data.map((item) => ({
                description: item.description,
                time: this.strToEpoch(item.time),
                attachment: item.attachment,
                company: item.company || company,
                title: item.title,
                topic: item.topic,
                keywords: item.keywords,
                publisher: item.publisher || publisher,
            }));
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveData(processedData) {
        for (const item of processedData) {
            const eqclass = this.NewsRepository.create(item);
            await this.NewsRepository.save(eqclass);
        }
    }
};
NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(news_entity_1.News)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map