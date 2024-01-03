import { Case } from "./case.entity";
export declare class transfer {
    id: number;
    type: string;
    state: string;
    hospital: string;
    other: string;
    prev_asset_no: string;
    prev_gov_asset_no: string;
    auto_snf: string;
    snf_no: string;
    case: Case;
}
