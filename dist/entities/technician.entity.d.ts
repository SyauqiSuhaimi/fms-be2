import { User } from "../auth/user.entity";
import { Case } from "./case.entity";
export declare class Technician {
    id: number;
    maintainer: User;
    assigner: User;
    cases: Case;
    rate: number;
    main_hour: number;
}
