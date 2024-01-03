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
exports.CasesGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/auth.service");
const contract_service_1 = require("../service-contract/contract.service");
const whitelist = [
    "web-module://api-client.app",
    "http://localhost:8080",
    "http://localhost:8081",
    "https://myces-fms.com",
    "http://myces-fms.com",
    "https://www.myces-fms.com",
    "http://www.myces-fms.com",
];
let CasesGateway = class CasesGateway {
    constructor(contractService, authService) {
        this.contractService = contractService;
        this.authService = authService;
        this.users = [];
        this.users2 = [];
    }
    configure(consumer) {
        console.log("config");
    }
    afterInit(socket) {
        socket.on("publish", (data) => {
            console.log(`Received publish event with payload: ${JSON.stringify(data)}`);
            this.server.emit("message", data);
        });
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    }
    async handleConnection(socket, ...args) {
        console.log(`Socket connected: ${socket.id}`);
        this.server.emit("connected");
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    }
    async notify(caseinfo) {
        console.log("asdasdads");
        this.server.emit("message", caseinfo);
        console.log("222222222");
    }
    async newnotify(email, data) {
        let text = "";
        try {
            text = JSON.stringify(data);
        }
        catch (error) { }
        this.server.emit(email, text);
    }
    handleNotifications(client) {
        console.log("call ni");
        this.server.emit("message");
    }
    handleEvent(data, client) {
        console.log(data["data"]);
        console.log(client.id + " has connected");
        this.users[data["data"]] = client.id;
        console.log(this.users);
    }
    handleDisconnect(client) {
        console.log(client.id + " disconnected");
        const index = this.users.indexOf(client.id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
        console.log(this.users);
    }
    pokeMember(client, data) {
        console.log("Client id " + client.id);
        console.log("Receiver id " + data["data"]);
        client.broadcast
            .to(this.users[data["data"]])
            .emit("poke:received", this.users.indexOf(client.id));
    }
    newCase(client, data) {
        console.log("New Case Reported");
        this.findAdmin(data["data"]).then((res) => {
            res.forEach((element) => {
                client.broadcast
                    .to(this.users[element.id])
                    .emit("newCase:received", this.users.indexOf(client.id));
            });
        });
    }
    newJob(client, data) {
        console.log("New Job Assigned");
        const techList = data["data"];
        console.log(techList);
        techList.forEach((element) => {
            console.log("Yg ni", element.id);
            this.findUser(element.id).then((res) => {
                res.forEach((element) => {
                    console.log(element.id);
                    client.broadcast
                        .to(this.users[element.id])
                        .emit("newJob:received", this.users.indexOf(client.id));
                });
            });
        });
    }
    async findAdmin(companyId) {
        const response = await this.authService.getAllUser({
            where: {
                company: { id: companyId },
                usertypes: { permissions: { features: { id: 21 } } },
            },
            relations: ["usertypes", "usertypes.permissions.features"],
        });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
    async findUser(id) {
        const response = await this.authService.getAllUser({ where: { id: id } });
        if (!response) {
            throw new common_1.BadRequestException("No Data");
        }
        else {
            return response;
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CasesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("noti"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CasesGateway.prototype, "handleNotifications", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("connected"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CasesGateway.prototype, "handleEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("poke"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], CasesGateway.prototype, "pokeMember", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("newCase"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], CasesGateway.prototype, "newCase", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("newJob"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], CasesGateway.prototype, "newJob", null);
CasesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(80, {
        cors: {
            origin: whitelist,
            credentials: true,
        },
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_service_1.ContractService,
        auth_service_1.AuthService])
], CasesGateway);
exports.CasesGateway = CasesGateway;
//# sourceMappingURL=cases.gateway.js.map