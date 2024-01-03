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
exports.CaseTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../auth/user.entity");
const caseType_entity_1 = require("../entities/caseType.entity");
const typeorm_2 = require("typeorm");
let CaseTypeService = class CaseTypeService {
    constructor(CaseTypeRepository, userRepository) {
        this.CaseTypeRepository = CaseTypeRepository;
        this.userRepository = userRepository;
    }
    findAll() {
        return this.CaseTypeRepository.find();
    }
    findAllC(id, usertype) {
        if (usertype == "user") {
            return this.CaseTypeRepository.find({
                where: {
                    company: { user: { id: id } },
                    userAccess: true,
                    name: (0, typeorm_2.Not)("PPM"),
                },
            });
        }
        else {
            return this.CaseTypeRepository.find({
                where: { company: { user: { id: id } }, name: (0, typeorm_2.Not)("PPM") },
            });
        }
    }
    findCondition(condition) {
        return this.CaseTypeRepository.find(condition);
    }
    findbyUser(condition) {
        return this.CaseTypeRepository.find(condition);
    }
    async findOne(condition) {
        return this.CaseTypeRepository.findOne(condition);
    }
    create(data) {
        return this.CaseTypeRepository.save(data);
    }
    async update(id, data) {
        return this.CaseTypeRepository.update(id, data);
    }
    async remove(id) {
        return this.CaseTypeRepository.delete(id);
    }
};
CaseTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(caseType_entity_1.CaseType)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CaseTypeService);
exports.CaseTypeService = CaseTypeService;
//# sourceMappingURL=Case_Type.service.js.map