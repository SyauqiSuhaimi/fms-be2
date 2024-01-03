import { Rating } from '../entities/rating.entity';
import { Repository } from 'typeorm';
export declare class RatingService {
    private RatingRepository;
    constructor(RatingRepository: Repository<Rating>);
    findAll(): Promise<Rating[]>;
    findCompany(condition: any): Promise<Rating[]>;
    findOne(condition: any): Promise<Rating>;
    create(cases: Rating): Promise<Rating>;
    update(id: number, data: Rating): Promise<any>;
    remove(id: number): Promise<any>;
}
