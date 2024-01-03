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
exports.AuthController2 = exports.AuthController = void 0;
const worktrade_service_1 = require("../workTrade/worktrade.service");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const type_decorator_1 = require("../type.decorator");
const roles_guard_1 = require("./roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const general_service_1 = require("../helper/general.service");
const helper_1 = require("../helper/helper");
const destinationPath = "/opt/bitnami/apache/htdocs/img/profilepic";
const destinationPath2 = "/opt/bitnami/apache/htdocs/files/user";
const storage = helper_1.default.functions.createMulterStorage(destinationPath);
const storage2 = helper_1.default.functions.createMulterStorage(destinationPath2);
let AuthController = class AuthController {
    constructor(authService, jwtService, GeneralService, worktradeservice) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.GeneralService = GeneralService;
        this.worktradeservice = worktradeservice;
    }
    async getUser(worktradeId) {
        const response = await this.authService.getAllUser({
            where: { worktrade: { id: worktradeId } },
        });
        const users = [];
        response.forEach((element) => {
            const { password, ...result } = element;
            users.push(result);
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return users;
        }
    }
    async getUserCompany(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.authService.userByCompany(data);
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async getUserDepartment(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.authService.getAllUser({
            where: { department: { user: { id: data["id"] } } },
        });
        const users = [];
        response.forEach((element) => {
            const { password, ...result } = element;
            users.push(result);
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return users;
        }
    }
    async typeAdd(status, type, name) {
        const usertype = await this.authService.createuserType({
            type,
            status,
            name,
        });
        return usertype;
    }
    async featureAdd(name, link, category, type) {
        const user = await this.authService.createFeature({
            name,
            link,
            category,
            type,
        });
        return user;
    }
    async user(request) {
        try {
            let cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const user = await this.authService.findOne({ id: data["id"] });
            const { password, ...result } = user;
            return result;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async changePassword(request, userData) {
        try {
            let cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const user = await this.authService.findOne({ id: data["id"] });
            if (!(await bcrypt.compare(userData.currPass, user.password))) {
                return { success: false, msg: "Wrong Current Password" };
            }
            else {
                user.password = await bcrypt.hash(userData.newPass, 10);
                await this.authService.updateUser(user.id, user);
                return { success: true, msg: "Password Changed" };
            }
        }
        catch (e) {
            return { success: false, msg: "Error,  please contact admin" };
        }
    }
    async delete(request, id) {
        try {
            const cookie = request.cookies["jwt"];
            let data = await this.jwtService.verifyAsync(cookie);
            const status = await this.authService.remove(id);
            return status;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async typeDelete(request, id) {
        try {
            const cookie = request.cookies["jwt"];
            console.log("cookie usrt del type ", cookie);
            let data = await this.jwtService.verifyAsync(cookie);
            console.log("data usrt del type ", data);
            const status = await this.authService.removeType(id);
            return status;
        }
        catch (e) {
            console.log("crash usr del type");
            throw new common_1.UnauthorizedException();
        }
    }
    async permissionDelete(request, id) {
        try {
            const cookie = request.cookies["jwt"];
            let data = await this.jwtService.verifyAsync(cookie);
            const status = await this.authService.removePermission(id);
            return status;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async featureDelete(request, id) {
        try {
            const cookie = request.cookies["jwt"];
            console.log(cookie);
            let data = await this.jwtService.verifyAsync(cookie);
            console.log(data);
            const status = await this.authService.removeFeature(id);
            return status;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async getall(request) {
        try {
            const cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const user = await this.authService.findall(data);
            const { ...result } = user;
            return result;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async getAllUserbyCompany(request, id) {
        try {
            console.log("id", id);
            const cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            let condition = {
                where: {},
                relations: [
                    "usertypes",
                    "worktrade",
                    "department",
                    "grouplist",
                    "grouplist.worktradelist",
                    "company",
                ],
            };
            if (id == null)
                condition["where"] = { company: { user: { id: data.id } } };
            else {
                if (data["usertype"] == "superadmin") {
                    condition["where"] = { company: { id: id } };
                }
                else {
                    throw new common_1.UnauthorizedException();
                }
            }
            const user = await this.authService.findAll(condition);
            const usersWithoutPassword = user.map((user) => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            return usersWithoutPassword;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async getalltype(request) {
        try {
            const cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const user = await this.authService.findAllType({
                where: { company: { user: { id: data["id"] } } },
                relations: ["permissions", "permissions.features"],
            });
            const { ...result } = user;
            return result;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async typeByCompany(request) {
        try {
            const cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const user = await this.authService.typeByCompany(data);
            const { ...result } = user;
            return result;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async typeByCompany2(request, id) {
        try {
            const cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            if (data["usertype"] == "superadmin") {
                const res = await this.authService.findAllType({
                    where: { company: { id: id } },
                    relations: ["permissions", "permissions.features"],
                });
                return res;
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async findAllTypeuser(request) {
        try {
            const cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const user = await this.authService.findAllTypeuser({});
            const { ...result } = user;
            return result;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async findUsertypeFeature(request) {
        try {
            const cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const user = await this.authService.findUsertypeFeature(data.id);
            const { ...result } = user;
            return result;
        }
        catch (e) {
            console.log(e);
            throw new common_1.UnauthorizedException();
        }
    }
    async getallfeature(request) {
        try {
            const cookie = request.cookies["jwt"];
            console.log(cookie);
            const data = await this.jwtService.verifyAsync(cookie);
            console.log(data);
            let user = [];
            if (data["usertype"] == "superadmin") {
                console.log("super");
                user = await this.authService.findAllFeature({
                    relations: ["permissions"],
                });
            }
            else {
                user = await this.authService.findAllFeature({
                    where: { only_admin: 0 },
                    relations: ["permissions"],
                });
                console.log("not");
            }
            const { ...result } = user;
            return result;
        }
        catch (e) {
            console.log(e);
            throw new common_1.UnauthorizedException();
        }
    }
    async updatePost2(request, id, userdata, files) {
        try {
            let n = files.length;
            let arr = [];
            userdata.image_file = "";
            if (n >= 1) {
                for (let i = 0; i < n; i++) {
                    arr.push(files[i].filename);
                }
                userdata.image_file = arr.toString();
            }
            console.log("a");
            const cookie = request.cookies["jwt"];
            console.log("b");
            const data = this.jwtService.verify(cookie);
            userdata = JSON.parse(JSON.stringify(userdata));
            console.log("c", id, userdata);
            const status = await this.authService.updateUser(id, JSON.parse(JSON.stringify(userdata)));
            console.log("c");
            return status;
        }
        catch (e) {
            console.log("e", e);
            throw new common_1.UnauthorizedException();
        }
    }
    async updatePost(request, id, userdata) {
        try {
            console.log("a");
            const cookie = request.cookies["jwt"];
            console.log("b");
            const data = this.jwtService.verify(cookie);
            console.log("c", id, userdata);
            const status = await this.authService.updateUser(id, userdata);
            console.log("c");
            return status;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    createcase(body, files) {
        console.log("user/edit");
        console.log(files);
        console.log(body);
        let n = files.length;
        let arr = [];
        body.image_file = "";
        if (n >= 1) {
            for (let i = 0; i < n; i++) {
                arr.push(files[i].filename);
            }
            body.image_file = arr.toString();
        }
        console.log("user/edit");
        return this.authService.create(body);
    }
    async typeUpdate(request, id, userdata) {
        try {
            const cookie = request.cookies["jwt"];
            const data = await this.jwtService.verifyAsync(cookie);
            const status = await this.authService.updateType(userdata);
            return status;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async permissionUpdate(request, id, permissiondata) {
        try {
            const cookie = request.cookies["jwt"];
            const data = this.jwtService.verify(cookie);
            console.log("id", id);
            const status = await this.authService.updatePermission(permissiondata.data.id, permissiondata.data);
            console.log("crash");
            return status;
        }
        catch (e) {
            console.log("crash");
            throw new common_1.UnauthorizedException();
        }
    }
    async featureUpdate(request, id, featuredata) {
        try {
            const cookie = request.cookies["jwt"];
            const data = this.jwtService.verify(cookie);
            delete featuredata.permissions;
            console.log("fd", featuredata);
            const status = await this.authService.updateFeature(id, featuredata);
            return status;
        }
        catch (e) {
            console.log(e);
            throw new common_1.UnauthorizedException();
        }
    }
    async userAdd(body, files) {
        body.usertypes = body.usertypes ? body.usertypes : 2;
        body.password = await bcrypt.hash(body.password, 10);
        console.log("body", body);
        let n = files.length;
        let arr = [];
        if (n >= 1) {
            for (let i = 0; i < n; i++) {
                arr.push(files[i].filename);
            }
            body.image_file = arr.toString();
        }
        body.image_file = body.image_file || "usericon.png";
        const user = await this.authService.create(body);
        delete user.password;
        return user;
    }
    async quickReg(body) {
        const user = await this.authService.create(body);
        delete user.password;
        return user;
    }
    async changeImage(body, files, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        console.log("body", body);
        let n = files.length;
        let arr = [];
        body.image_file = null;
        if (n >= 1) {
            for (let i = 0; i < n; i++) {
                arr.push(files[i].filename);
            }
            body.image_file = arr.toString();
        }
        const user = await this.authService.findOne({ id: data["id"] });
        user.image_file = body.image_file;
        try {
            await this.authService.updateUser(user.id, user);
            return { success: true, msg: "Image Uploaded" };
        }
        catch (error) {
            return { success: false, msg: "Error,  please contact admin" };
        }
    }
    async resetPassword(body) {
        body.usertypes = body.usertypes ? body.usertypes : 2;
        body.password = await bcrypt.hash(body.password, 10);
        console.log("body", body);
        const user = await this.authService.updateUser(body.id, body);
        delete user.password;
        return user;
    }
    async downloadexcel(res) {
        const worktrades = await this.worktradeservice.findAll({});
        const worktradeNames = worktrades
            .map((worktrade) => worktrade.name)
            .join(",  ");
        const data = [
            {
                user_work_id: "id",
                name: "name",
                email: "something@gmail.com",
                password: "password",
                designation: "designation",
                rate: "rate per hour",
                ot1: "overtime",
                ot2: "overtime2",
                ot3: "overtime3",
                usertypes: "usertypes id",
                mobile_no: "mobile_no",
            },
        ];
        const fileNamePrefix = "template";
        const filePath = await this.GeneralService.downloadExcelData(data, fileNamePrefix);
        res.download(filePath);
    }
    async downloadExcelData(res, request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const response = await this.authService.findAll({
            where: { company: { user: { id: data["id"] } } },
            relations: [
                "usertypes",
                "company",
                "department",
                "grouplist",
                "worktrade",
            ],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            let columns = {
                Users: [
                    {
                        field: "id",
                        format: (value) => `${value}`,
                        label: "id",
                    },
                    {
                        field: "name",
                        format: (value) => `${value}`,
                        label: "name",
                    },
                    {
                        field: "email",
                        format: (value) => `${value}`,
                        label: "email",
                    },
                    {
                        field: "rate",
                        format: (value) => `${value ? value : "0"}`,
                        label: "rate",
                    },
                    {
                        field: "ot1",
                        format: (value) => `${value ? value : "0"}`,
                        label: "ot1",
                    },
                    {
                        field: "ot2",
                        format: (value) => `${value ? value : "0"}`,
                        label: "ot2",
                    },
                    {
                        field: "ot3",
                        format: (value) => `${value ? value : "0"}`,
                        label: "ot3",
                    },
                    {
                        field: "mobile_no",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "mobile_no",
                    },
                    {
                        field: "usertypes_id",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "usertypes_id",
                    },
                    {
                        field: "usertypes_type",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "usertypes_type",
                    },
                    {
                        field: "usertypes_status",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "usertypes_status",
                    },
                    {
                        field: "usertypes_useraccess",
                        format: (value) => `${value}`,
                        label: "usertypes_useraccess",
                    },
                    {
                        field: "company_name",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "company_name",
                    },
                    {
                        field: "department_id",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "department_id",
                    },
                    {
                        field: "department_name",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "department_name",
                    },
                    {
                        field: "department_type",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "department_type",
                    },
                    {
                        field: "grouplist_name",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "grouplist_name",
                    },
                ],
                worktrade: [
                    {
                        field: "Users_id",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "Users_id",
                    },
                    {
                        field: "Users_name",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "Users_name",
                    },
                    {
                        field: "id",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "id",
                    },
                    {
                        field: "name",
                        format: (value) => `${value ? value : "NA"}`,
                        label: "name",
                    },
                ],
            };
            const fileNamePrefix = "Users";
            const filePath = await this.GeneralService.downloadExcelData(this.GeneralService.flattenArrayOfObjects(fileNamePrefix, response), fileNamePrefix, columns, true);
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
        console.log(company, "sini company from controller");
        this.authService.parseExcelFilet(files, company);
    }
    async testdownloadExcelData(res) {
        const data = await this.authService.findTypeall({
            relations: ["permissions", "company"],
        });
        const fileNamePrefix = "UsersType";
        const filePath = await this.GeneralService.downloadExcelData(this.GeneralService.flattenArrayOfObjects(fileNamePrefix, data), fileNamePrefix, {}, true);
        res.download(filePath);
    }
};
__decorate([
    (0, common_1.Get)("technician/:worktradeId"),
    __param(0, (0, common_1.Param)("worktradeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)("userCompany"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserCompany", null);
__decorate([
    (0, common_1.Get)("userDepartment"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserDepartment", null);
__decorate([
    (0, common_1.Post)("usertype/addtype"),
    __param(0, (0, common_1.Body)("status")),
    __param(1, (0, common_1.Body)("type")),
    __param(2, (0, common_1.Body)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "typeAdd", null);
__decorate([
    (0, common_1.Post)("addfeature"),
    __param(0, (0, common_1.Body)("name")),
    __param(1, (0, common_1.Body)("link")),
    __param(2, (0, common_1.Body)("category")),
    __param(3, (0, common_1.Body)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "featureAdd", null);
__decorate([
    (0, common_1.Get)("user"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "user", null);
__decorate([
    (0, common_1.Post)("changepassword"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Post)("usertype/deletetype"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "typeDelete", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Post)("deleteper"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "permissionDelete", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Post)("deletefeat"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "featureDelete", null);
__decorate([
    (0, common_1.Get)("user/getall"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getall", null);
__decorate([
    (0, common_1.Get)("user/getall/byCompany/:id?"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllUserbyCompany", null);
__decorate([
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Get)("usertype/getalltype"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getalltype", null);
__decorate([
    (0, common_1.Get)("usertype/typeByCompany"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "typeByCompany", null);
__decorate([
    (0, common_1.Get)("usertype/typeByCompany/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "typeByCompany2", null);
__decorate([
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Get)("usertype/getall"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findAllTypeuser", null);
__decorate([
    (0, common_1.Get)("usertype/getlist"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findUsertypeFeature", null);
__decorate([
    (0, common_1.Get)("getallfeature"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getallfeature", null);
__decorate([
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Post)("/edit/:id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 10, { storage: storage })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, Array]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePost2", null);
__decorate([
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Post)("/edit"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("id")),
    __param(2, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Post)("user/edit"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createcase", null);
__decorate([
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Post)("usertype/edittype"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("id")),
    __param(2, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "typeUpdate", null);
__decorate([
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Post)("/editper"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "permissionUpdate", null);
__decorate([
    (0, type_decorator_1.Roles)("admin", "superadmin"),
    (0, common_1.Post)("editfeat"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("id")),
    __param(2, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "featureUpdate", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userAdd", null);
__decorate([
    (0, common_1.Post)("quickreg"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "quickReg", null);
__decorate([
    (0, common_1.Post)("changeimage"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files[]", 10, { storage: storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changeImage", null);
__decorate([
    (0, common_1.Post)("reset"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)("/template/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "downloadexcel", null);
__decorate([
    (0, common_1.Get)("/data/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "downloadExcelData", null);
__decorate([
    (0, common_1.Post)("/excel"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10, { storage: storage2 })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)("/type/download"),
    (0, common_1.Header)("Content-type", "text/xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "testdownloadExcelData", null);
AuthController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, type_decorator_1.Roles)("*"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService,
        general_service_1.GeneralService,
        worktrade_service_1.WorkTradeService])
], AuthController);
exports.AuthController = AuthController;
let AuthController2 = class AuthController2 {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async login(email, password, response) {
        const user = await this.authService.findOne({ email: email });
        if (!user) {
            response.clearCookie("jwt");
            return {
                success: false,
                message: "User Does Not Exist",
            };
        }
        else if (!(await bcrypt.compare(password, user.password))) {
            return {
                success: false,
                message: "wrong password",
            };
        }
        else {
            let info = {
                id: user.id,
                usertype: user.usertypes.type,
                company: user.company,
            };
            const jwt = this.jwtService.sign(info);
            response.cookie("jwt", jwt, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000 * 7,
            });
            console.log("cookie");
            return {
                success: true,
                message: "success",
                usertype: user.usertypes.type,
                company: user.company,
            };
        }
    }
    async logout(response) {
        response.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 * 7,
        });
        return {
            message: "success",
        };
    }
};
__decorate([
    (0, common_1.Get)("login/:email/:password"),
    __param(0, (0, common_1.Param)("email")),
    __param(1, (0, common_1.Param)("password")),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController2.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController2.prototype, "logout", null);
AuthController2 = __decorate([
    (0, common_1.Controller)("noauth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController2);
exports.AuthController2 = AuthController2;
//# sourceMappingURL=auth.controller.js.map