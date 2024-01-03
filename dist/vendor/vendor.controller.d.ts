import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { VendorService } from "./vendor.service";
import { Vendor } from "../entities/vendor.entity";
export declare class VendorController {
    private VendorService;
    private jwtService;
    constructor(VendorService: VendorService, jwtService: JwtService);
    fillAll(): Promise<Vendor[]>;
    byCompany(request: Request): Promise<Vendor[]>;
    findOne(id: number): Promise<Vendor>;
    create(createVendorData: Vendor): Promise<Vendor>;
    update(id: number, updateVendorData: Vendor): Promise<Vendor>;
    delete(id: number): Promise<any>;
    getAll(request: Request, bodyData: any): Promise<any>;
}
