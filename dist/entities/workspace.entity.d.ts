import { PanelType } from "./paneltype.entity";
import { User } from "../auth/user.entity";
import { Panel } from "./panel.entity";
export declare class workspace {
    id: number;
    name: string;
    user: User;
    panel: Panel;
    details: string;
    paneltype: PanelType;
}
