import { Company } from "./company.entity";
import { User } from "../auth/user.entity";
import { Notifications } from "./notification.entity";
export declare class News {
    id: number;
    title: string;
    description: string;
    time: number;
    attachment: string;
    company: Company;
    topic: string;
    keywords: string;
    publisher: User;
    notifications: Notifications[];
}
