import { PPM } from "../entities/ppm.entity";
import { HolidayService } from "../holiday/holiday.service";
import { Repository } from "typeorm";
export declare class PPMService {
    private HolidayService;
    private PpmRepository;
    constructor(HolidayService: HolidayService, PpmRepository: Repository<PPM>);
    findAll(condition: any): Promise<PPM[]>;
    findOne(condition: any): Promise<PPM>;
    create(data: PPM): Promise<PPM>;
    update(id: number, data: PPM): Promise<any>;
    remove(id: number): Promise<any>;
    dataForPPM(userData: any, eqId: any): Promise<{
        holiday: import("../entities/holiday.entity").Holiday[];
        ppmList: any;
    }>;
    parseExcelFile(files: any): Promise<void>;
    strToEpoch(thedate: string): number;
    private preProcessData;
    private saveData;
}
