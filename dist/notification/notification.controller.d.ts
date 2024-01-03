import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { NotificationsService } from "./notification.service";
import { Notifications } from "../entities/notification.entity";
export declare class NotificationsController {
    private notificationsService;
    private jwtService;
    constructor(notificationsService: NotificationsService, jwtService: JwtService);
    findall(): Promise<Notifications[]>;
    findAll(request: Request): Promise<Notifications[]>;
    findOne(id: number): Promise<Notifications>;
    create(createNotiData: Notifications): Promise<Notifications>;
    update(id: number, updateNotiData: Notifications): Promise<Notifications>;
    delete(id: number): Promise<any>;
}
