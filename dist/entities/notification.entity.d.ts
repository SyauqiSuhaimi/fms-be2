import { User } from "../auth/user.entity";
import { Case } from "./case.entity";
import { CaseHistory } from "./caseHistory.entity";
import { News } from "./news.entity";
export declare class Notifications {
    id: number;
    name: string;
    cases: Case;
    casehistory: CaseHistory;
    news: News;
    user: User;
}
