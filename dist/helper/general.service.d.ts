import { EntityMetadata } from "typeorm";
import { Repository } from "typeorm";
import { Case } from "../entities/case.entity";
import { Equipment } from "../entities/equipment.entity";
import { Connection } from "typeorm";
export declare class GeneralService {
    private readonly caseRepository;
    private readonly equipmentRepository;
    private readonly connection;
    constructor(caseRepository: Repository<Case>, equipmentRepository: Repository<Equipment>, connection: Connection);
    deepCopy(obj: any): any;
    downloadExcelData(data: any, fileNamePrefix: any, columns?: any, multisheet?: boolean): Promise<string>;
    private styleSheet;
    newstyleSheet(workbook: any, sheetStyles: any): void;
    epochtodate(d: number): string;
    epochtodateonly(d: number): string;
    strToEpoch(thedate: string): number;
    getIntervalDesc(search: any): any;
    flattenArrayOfObjects(InputName: any, Inputarr: any, rootname?: any, root?: any, keylist?: any): {};
    getMetadataInfo(metadata: EntityMetadata): Record<string, any>;
    mapEntityToJSON(entityname: any): any;
    writeJsonToFile(filePath: string, data: any): Promise<void>;
    readJsonFromFile(filePath: string): Promise<any>;
    downloadFile(url: string): Promise<string>;
    jsondaata(url: string): Promise<string>;
    savebase64(folderPath: any, base64data: any): string;
    removepasswordcase(cases: any[]): void;
}
