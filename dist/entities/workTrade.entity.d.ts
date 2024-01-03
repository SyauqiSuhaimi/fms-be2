import { Eq_Type } from "../entities/eq_type.entity";
import { User } from "../auth/user.entity";
import { Case } from "./case.entity";
import { Company } from "./company.entity";
import { Equipment } from "./equipment.entity";
import { GroupList } from "./groupList.entity";
import { tempPpm } from "./tempppm.entity";
import { GroupMain } from "./groupMain.entity";
export declare class WorkTrade {
    id: number;
    name: string;
    company: Company;
    cases: Case[];
    equipment: Equipment[];
    eq_type: Eq_Type;
    users: User[];
    grouplist: GroupList[];
    tempPpm: tempPpm[];
    groupmain: GroupMain[];
}
