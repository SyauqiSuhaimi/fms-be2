import { JwtService } from "@nestjs/jwt";
import { RatingService } from "./rating.service";
import { Rating } from "../entities/rating.entity";
export declare class RatingController {
    private RatingService;
    private jwtService;
    constructor(RatingService: RatingService, jwtService: JwtService);
    fillAll(): Promise<Rating[]>;
    findOne(id: number): Promise<Rating>;
    create(createRatingData: Rating): Promise<Rating>;
    update(id: number, createRatingData: Rating): Promise<Rating>;
    delete(id: number): Promise<any>;
}
