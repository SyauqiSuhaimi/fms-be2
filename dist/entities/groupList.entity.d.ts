import { User } from "../auth/user.entity";
import { WorkTrade } from "./workTrade.entity";
import { Company } from "./company.entity";
import { userType } from "../auth/usertype.entity";
export declare class GroupList {
    id: number;
    name: string;
    company: Company;
    users: User[];
    worktradelist: WorkTrade[];
    usertype: userType[];
}
