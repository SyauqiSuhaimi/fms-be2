import { Vendor } from "../entities/vendor.entity";
import { Repository } from "typeorm";
export declare class VendorService {
    private VendorRepository;
    constructor(VendorRepository: Repository<Vendor>);
    findAll(data: any): Promise<Vendor[]>;
    find(condition: any): Promise<Vendor[]>;
    findOne(condition: any): Promise<Vendor>;
    create(cases: Vendor): Promise<Vendor>;
    update(id: number, data: Vendor): Promise<any>;
    remove(id: number): Promise<any>;
}
