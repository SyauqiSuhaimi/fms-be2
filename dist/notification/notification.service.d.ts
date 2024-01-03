import { Repository } from "typeorm";
import { Notifications } from "../entities/notification.entity";
export declare class NotificationsService {
    private NewsRepository;
    constructor(NewsRepository: Repository<Notifications>);
    findAll(condition?: any): Promise<Notifications[]>;
    finduser(condition: any): Promise<Notifications[]>;
    findOne(condition: any): Promise<Notifications>;
    create(data: any): Promise<Notifications>;
    update(id: number, data: Notifications): Promise<any>;
    remove(id: number): Promise<any>;
}
