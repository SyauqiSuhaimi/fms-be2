import { CompanyService } from "../company/company.service";
import { Holiday } from "../entities/holiday.entity";
import { Repository } from "typeorm";
import { GeneralService } from "../helper/general.service";
export declare class HolidayService {
    private HolidayRepository;
    private CompanyService;
    private GeneralService;
    constructor(HolidayRepository: Repository<Holiday>, CompanyService: CompanyService, GeneralService: GeneralService);
    findAll(condition: any): Promise<Holiday[]>;
    findOne(condition: any): Promise<Holiday>;
    create(itemData: Holiday): Promise<Holiday>;
    update(id: number, itemData: Holiday): Promise<any>;
    remove(id: number): Promise<any>;
    byCompany(userData: any): Promise<Holiday[]>;
    generateHoliday(userData: any, post_input: any, getYear: number): Promise<{
        name: string;
        date: string;
    }[]>;
    parseExcelFile(files: any, company: any): Promise<void>;
    private preProcessData;
    private saveData;
}
