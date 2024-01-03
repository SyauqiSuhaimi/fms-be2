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
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const auth_service_1 = require("../auth/auth.service");
const news_entity_1 = require("../entities/news.entity");
const news_service_1 = require("./news.service");
const general_service_1 = require("../helper/general.service");
const helper_1 = require("../helper/helper");
const notification_service_1 = require("../notification/notification.service");
const cases_gateway_1 = require("../GatewayHandler/cases.gateway");
const destinationPath = "/opt/bitnami/apache/htdocs/files/news";
const storage = helper_1.default.functions.createMulterStorage(destinationPath);
let NewsController = class NewsController {
    constructor(newsService, jwtService, GeneralService, AuthService, notificationsService, casegateway) {
        this.newsService = newsService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
        this.AuthService = AuthService;
        this.notificationsService = notificationsService;
        this.casegateway = casegateway;
    }
    async findAll(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.newsService.findCase({
            where: { company: { user: { id: data.id } } },
        });
        return response;
    }
    async byCompany(request, id) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        try {
            const response = await this.newsService.findCase({
                where: { company: { user: { id: data["id"] } } },
                relations: ["publisher"],
            });
            return response;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
    }
    async byCompany2(request, id) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        if (data["usertype"] == "superadmin") {
            const response = await this.newsService.findCase({
                where: { company: { id: id } },
            });
            return response;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async findOne(id) {
        const response = await this.newsService.findOne({
            where: { id: id },
            relations: ["publisher"],
        });
        delete response.publisher.password;
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async create(createNewsData) {
        const response = await this.newsService.create(createNewsData);
        return response;
    }
    async update(id, updateCaseData) {
        const response = await this.newsService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response2 = await this.newsService.update(id, updateCaseData);
            return updateCaseData;
        }
    }
    async delete(id) {
        const response = await this.newsService.findOne({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            const response = await this.newsService.remove(id);
            return response;
        }
    }
    uploadFiles(body, files) {
        console.log(files, "hai awak");
        console.log(body["Name"]);
    }
    async createcase(body, files, request) {
        console.log("case/create");
        console.log(storage, "storage");
        console.log(storage.getdestination, "destination");
        console.log(files, "here file");
        console.log(body, "here body send fron-ent");
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const publisher = data.id;
        const company = data.company;
        body.publisher = publisher;
        body.company = company;
        console.log(body.publisher, "publisher");
        let n = files.length;
        console.log(n, "here is n where file.length");
        let arr = [];
        body.image_file = "";
        if (n >= 1) {
            for (let i = 0; i < n; i++) {
                arr.push(files[i].filename);
                console.log(arr, "arr");
            }
            body.attachment = arr.toString();
        }
        console.log(body, "case/create/ here it end");
        const response = await this.newsService.create(body);
        console.log(response, "case/create/ here it create news");
        if (data["usertype"] == "superadmin") {
            console.log("atas");
            const users = this.AuthService.findAll({});
            const userIds = (await users).map((user) => ({
                id: user.id,
                email: user.email,
            }));
            userIds.forEach(async (user) => {
                const noti = await this.notificationsService.create({
                    name: "news",
                    user: user,
                    news: response["id"],
                });
                this.notificationsService
                    .finduser({
                    where: { id: noti.id },
                    relations: ["news", "news.publisher"],
                })
                    .then((noti) => {
                    delete noti[0].news.publisher.password;
                    this.casegateway.newnotify(user.email, noti[0]);
                });
                console.log(noti, "sini nak tgk noti id from superadmin");
            });
        }
        else {
            const users = this.AuthService.findAll({
                where: { company: body.company },
            });
            const userIds = (await users).map((user) => ({
                id: user.id,
                email: user.email,
            }));
            console.log("bawah");
            userIds.forEach(async (user) => {
                const noti = await this.notificationsService.create({
                    name: "news",
                    user: user,
                    news: response["id"],
                });
                this.notificationsService
                    .finduser({
                    where: { id: noti.id },
                    relations: ["news", "news.publisher"],
                })
                    .then((noti) => {
                    delete noti[0].news.publisher.password;
                    this.casegateway.newnotify(user.email, noti[0]);
                });
                console.log(noti, "sini nak tgk noti id from admin");
            });
        }
        return response;
    }
    uploadfile(files) {
        console.log(files, "mana?");
        return "success";
    }
    async downloadexcel(res) {
        let result = await this.newsService.donwloadExcel();
        res.download(`${result}`);
    }
    epochtodate(d) {
        let tempdate = new Date(d * 1000);
        let year = tempdate.getFullYear();
        let month = (tempdate.getMonth() + 1).toString().padStart(2, "0");
        let day = tempdate.getDate().toString().padStart(2, "0");
        let str = `${day}/${month}/${year}`;
        let hours = tempdate.getHours();
        let minutes = tempdate.getMinutes().toString().padStart(2, "0");
        let seconds = tempdate.getSeconds().toString().padStart(2, "0");
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        let timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;
        return `${str},  ${timeStr}`;
    }
    async downloadExcelData(res, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.newsService.findAll({
            where: { company: { user: { id: data["id"] } } },
            relations: ["company", "publisher"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            let columns = [
                {
                    field: "id",
                    format: (value) => `${value}`,
                    label: "id",
                },
                {
                    field: "description",
                    format: (value) => `${value}`,
                    label: "description",
                },
                {
                    field: "time",
                    format: (value) => `${this.epochtodate(value)}`,
                    label: "time",
                },
                {
                    field: "attachment",
                    format: (value) => `${value}`,
                    label: "attachment",
                },
                {
                    field: "title",
                    format: (value) => `${value}`,
                    label: "title",
                },
                {
                    field: "topic",
                    format: (value) => `${value}`,
                    label: "topic",
                },
                {
                    field: "keywords",
                    format: (value) => `${value}`,
                    label: "keywords",
                },
                {
                    field: "company",
                    format: (value) => `${value.name}`,
                    label: "company",
                },
                {
                    field: "publisher",
                    format: (value) => `${value.name}`,
                    label: "publisher",
                },
            ];
            const fileNamePrefix = "News";
            const filePath = await this.GeneralService.downloadExcelData(response, fileNamePrefix, columns);
            res.download(filePath);
        }
    }
    async uploadFile(body, files, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        if (files) {
            const file = files[0];
            const filename = file.filename;
            console.log(filename, "test filename");
        }
        console.log(files, "sini ade ape pulak");
        console.log(data, "sini tgk token");
        const company = data.company;
        const publisher = data.id;
        console.log(company, "sini company from controller");
        console.log(publisher, "sini company from controller");
        this.newsService.parseExcelFile(files, company, publisher);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("bycompany"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "byCompany", null);
__decorate([
    (0, common_1.Get)("bycompany/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "byCompany2", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_entity_1.News]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, news_entity_1.News]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("uploadmulti"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "uploadFiles", null);
__decorate([
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Post)("create/files"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "createcase", null);
__decorate([
    (0, common_1.Post)("upload/picture"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("picture", { storage: storage })),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "uploadfile", null);
__decorate([
    (0, common_1.Get)("/template/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "downloadexcel", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "downloadExcelData", null);
__decorate([
    (0, common_1.Post)("/excel"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "uploadFile", null);
NewsController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("news"),
    __metadata("design:paramtypes", [news_service_1.NewsService,
        jwt_1.JwtService,
        general_service_1.GeneralService,
        auth_service_1.AuthService,
        notification_service_1.NotificationsService,
        cases_gateway_1.CasesGateway])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map