import { Feature } from "./feature.entity";
import { userType } from "./usertype.entity";
export declare class userPermission {
    id: number;
    level: number;
    usertypes: userType;
    features: Feature;
}
