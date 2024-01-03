import { Server, Socket } from "socket.io";
import { AuthService } from "../auth/auth.service";
import { ContractService } from "../service-contract/contract.service";
export declare class CasesGateway {
    private contractService;
    private authService;
    constructor(contractService: ContractService, authService: AuthService);
    server: Server;
    configure(consumer: any): void;
    afterInit(socket: Socket): void;
    handleConnection(socket: Socket, ...args: any[]): Promise<void>;
    users: any[];
    users2: any[];
    notify(caseinfo: any): Promise<void>;
    newnotify(email: any, data: any): Promise<void>;
    handleNotifications(client: Socket): void;
    handleEvent(data: any, client: Socket): void;
    handleDisconnect(client: Socket): void;
    pokeMember(client: Socket, data: any): void;
    newCase(client: Socket, data: any): void;
    newJob(client: Socket, data: any): void;
    findAdmin(companyId: any): Promise<import("../auth/user.entity").User[]>;
    findUser(id: any): Promise<import("../auth/user.entity").User[]>;
}
