import { Response, Request } from "express";
import { GroupListService } from "./group_list.service";
import { GroupList } from "../entities/groupList.entity";
import { JwtService } from "@nestjs/jwt";
import { GeneralService } from "../helper/general.service";
import { WorkTradeService } from "../workTrade/worktrade.service";
export declare class GroupListController {
    private groupListService;
    private jwtService;
    private GeneralService;
    private worktradeservice;
    constructor(groupListService: GroupListService, jwtService: JwtService, GeneralService: GeneralService, worktradeservice: WorkTradeService);
    fillAll(): Promise<GroupList[]>;
    findOne(id: number): Promise<GroupList>;
    create(createGroupListData: GroupList): Promise<GroupList>;
    update(id: number, updateGroupListData: GroupList): Promise<GroupList>;
    delete(id: number): Promise<any>;
    byCompany(id: number): Promise<GroupList[]>;
    byUser(request: Request): Promise<GroupList[]>;
    downloadexcel(res: Response): Promise<void>;
    downloadExcelData(res: Response, request: Request): Promise<void>;
    uploadtestFile(body: any, files: any, request: Request): Promise<void>;
}
