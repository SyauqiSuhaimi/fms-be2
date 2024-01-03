import { Company } from "../entities/company.entity";
import { User } from "./user.entity";
import { userPermission } from "./userpermission.entity";
import { GroupList } from "../entities/groupList.entity";
export declare class userType {
    id: number;
    name: string;
    status: boolean;
    useraccess: boolean;
    company: Company;
    users: User[];
    permissions: userPermission[];
    grouplist: GroupList;
    mobile_access: boolean;
    web_access: boolean;
    view_mode: boolean;
    type: string;
}
