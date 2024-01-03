import { WorkTrade } from "./workTrade.entity";
import { Eq_Type } from "./eq_type.entity";
export declare class GroupMain {
    id: number;
    name: string;
    worktrade: WorkTrade;
    eqtype: Eq_Type[];
}
