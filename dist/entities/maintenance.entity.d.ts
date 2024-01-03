import { User } from "../auth/user.entity";
import { Case } from "./case.entity";
export declare class Maintenance {
    id: number;
    date: number;
    vendor: string;
    ppm: boolean;
    description: string;
    file: string;
    cases: Case;
    users: User;
}
