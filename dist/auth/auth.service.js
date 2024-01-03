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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const userpermission_entity_1 = require("./userpermission.entity");
const usertype_entity_1 = require("./usertype.entity");
const feature_entity_1 = require("./feature.entity");
const xlsx = require("xlsx");
const fs = require("fs");
const bcrypt = require("bcrypt");
const workTrade_entity_1 = require("../entities/workTrade.entity");
let AuthService = class AuthService {
    constructor(userRepository, userTypeRepository, userPermissionRepository, FeatureRepository, WorkTradeRepository) {
        this.userRepository = userRepository;
        this.userTypeRepository = userTypeRepository;
        this.userPermissionRepository = userPermissionRepository;
        this.FeatureRepository = FeatureRepository;
        this.WorkTradeRepository = WorkTradeRepository;
    }
    test() {
        return "test";
    }
    async create(data) {
        return this.userRepository.save(data);
    }
    async createuserType(data) {
        return this.userTypeRepository.save(data);
    }
    async createuserPer(data) {
        return this.userPermissionRepository.save(data);
    }
    async createFeature(data) {
        return this.FeatureRepository.save(data);
    }
    async findAll(condition) {
        return this.userRepository.find(condition);
    }
    async findOn(condition) {
        return this.userRepository.findOne(condition);
    }
    async findOne(condition) {
        return this.userRepository.findOne({
            where: condition,
            relations: ["usertypes", "company", "department", "worktrade"],
        });
    }
    async findType(condition) {
        return this.userTypeRepository.findOne({
            where: condition,
            relations: ["permissions", "users"],
        });
    }
    async findTypeall(condition) {
        return this.userTypeRepository.find(condition);
    }
    async findPermission(condition) {
        return this.userPermissionRepository.findOne({
            where: condition,
            relations: ["usertypes", "features"],
        });
    }
    async findFeature(condition) {
        return this.FeatureRepository.findOne({
            where: condition,
            relations: ["permissions"],
        });
    }
    async findall(data) {
        return this.userRepository.find({
            where: { company: { user: { id: data.id } } },
            relations: [
                "usertypes",
                "worktrade",
                "department",
                "grouplist",
                "grouplist.worktradelist",
            ],
        });
    }
    async findAllType(data) {
        return this.userTypeRepository.find(data);
    }
    async typeByCompany(data) {
        return this.userTypeRepository.find({
            where: { company: { user: { id: data.id } } },
            relations: ["permissions", "permissions.features"],
        });
    }
    async findAllTypeuser(data) {
        return this.userTypeRepository.find();
    }
    async findAllPermission(data) {
        return this.userPermissionRepository.find({
            relations: ["usertypes", "features"],
        });
    }
    async findAllFeature(data) {
        return this.FeatureRepository.find(data);
    }
    async findUsertypeFeature(id) {
        let data = await this.userRepository.findOne({
            where: { id: id, usertypes: { permissions: { level: (0, typeorm_2.MoreThan)(0) } } },
            relations: ["usertypes", "usertypes.permissions.features"],
        });
        return data ? await data["usertypes"]["permissions"] : [];
    }
    async remove(id) {
        return this.userRepository.delete({ id: id });
    }
    async removeType(id) {
        return this.userTypeRepository.delete({ id: id });
    }
    async removePermission(id) {
        return this.userPermissionRepository.delete({ id: id });
    }
    async removeFeature(id) {
        return this.FeatureRepository.delete({ id: id });
    }
    async updateUser(id, data) {
        return this.userRepository.save(data);
    }
    async updateType(data) {
        return this.userTypeRepository.save(data);
    }
    async updatePermission(id, data) {
        console.log("id", id);
        console.log("data", data);
        return this.userTypeRepository.save(data);
    }
    async updateFeature(id, data) {
        return this.FeatureRepository.update(id, data);
    }
    async userByCompany(userId) {
        const response = await this.userRepository.find({
            where: { company: { user: { id: userId["id"] } } },
            relations: ["department", "usertypes"],
        });
        const users = [];
        response.forEach((element) => {
            const { password, ...result } = element;
            users.push(result);
        });
        return users;
    }
    async userCond(condition) {
        const response = await this.userRepository.find(condition);
        const users = [];
        response.forEach((element) => {
            const { password, ...result } = element;
            users.push(result);
        });
        return users;
    }
    async getAllFeatures(condition) {
        return this.FeatureRepository.find(condition);
    }
    async getAllUser(condition) {
        return this.userRepository.find(condition);
    }
    async parseExcelFilet(files, company) {
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
    async preProcessData(data, company) {
        try {
            const processedData = data.map(async (item) => {
                console.log(item, "item");
                let arr1 = item.worktrade
                    ? item.worktrade.replace(/\s+/g, "").split(", ")
                    : [];
                return {
                    user_work_id: item.user_work_id,
                    name: item.name,
                    email: item.email,
                    password: item.password ? await bcrypt.hash(item.password, 10) : "",
                    rate: item.rate,
                    ot1: item.ot1,
                    ot2: item.ot2,
                    ot3: item.ot3,
                    usertypes: item.usertypes,
                    grouplist: item.grouplist,
                    company: item.company || company,
                    department: item.department,
                    designation: item.designation,
                    mobile_no: item.mobile_no,
                    worktrade: arr1,
                };
            });
            return Promise.all(processedData);
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveData(processedData) {
        const responses = [];
        for (const item of processedData) {
            console.log("item", item);
            const user = await this.create(item);
            responses.push(user);
        }
        return responses;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(usertype_entity_1.userType)),
    __param(2, (0, typeorm_1.InjectRepository)(userpermission_entity_1.userPermission)),
    __param(3, (0, typeorm_1.InjectRepository)(feature_entity_1.Feature)),
    __param(4, (0, typeorm_1.InjectRepository)(workTrade_entity_1.WorkTrade)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map