import { PanelType } from "./paneltype.entity";
import { workspace } from "./workspace.entity";
export declare class Panel {
    id: number;
    name: string;
    type: number;
    option_1: number;
    option_2: number;
    option_3: number;
    option_4: number;
    x: number;
    y: number;
    w: number;
    h: number;
    details: string;
    paneltype: PanelType;
    workspace: workspace;
}
