import { userPermission } from "./userpermission.entity";
export declare class Feature {
    id: number;
    name: string;
    link: string;
    type: string;
    category: string;
    order: number;
    only_admin: boolean;
    permissions: userPermission[];
}
