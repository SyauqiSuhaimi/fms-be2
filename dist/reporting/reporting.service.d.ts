import { CreateReportingDto } from "./dto/create-reporting.dto";
import { UpdateReportingDto } from "./dto/update-reporting.dto";
export declare class ReportingService {
    create(createReportingDto: CreateReportingDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReportingDto: UpdateReportingDto): string;
    remove(id: number): string;
}
