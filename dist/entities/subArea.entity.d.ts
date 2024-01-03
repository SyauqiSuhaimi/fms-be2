import { Area } from "./area.entity";
import { Case } from "./case.entity";
import { Equipment } from "./equipment.entity";
export declare class SubArea {
    id: Number;
    code: string;
    name: string;
    area: Area;
    equipment: Equipment[];
    fromcases: Case[];
    tocases: Case[];
    nomad_cases: Case[];
}
