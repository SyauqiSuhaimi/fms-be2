import { Equipment } from "./equipment.entity";
import { WorkTrade } from "./workTrade.entity";
import { User } from "../auth/user.entity";
import { SubArea } from "./subArea.entity";
import { PPM } from "./ppm.entity";
export declare class tempPpm {
    id: number;
    request_date: number;
    requestor: User;
    contact_name: string;
    mobile_no: string;
    description: string;
    expected_day_taken: number;
    end_date: number;
    equipment: Equipment;
    worktrade: WorkTrade;
    ppm: PPM;
    location: SubArea;
}
