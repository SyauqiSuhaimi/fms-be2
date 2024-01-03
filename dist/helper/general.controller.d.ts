import { GeneralService } from "./general.service";
export declare class GeneralController {
    private service;
    constructor(service: GeneralService);
    saveImage(body: any): Promise<{
        success: boolean;
        message: string;
        data: {
            filename: string;
        };
    } | {
        success: boolean;
        message: string;
        data: {
            filename?: undefined;
        };
    }>;
}
