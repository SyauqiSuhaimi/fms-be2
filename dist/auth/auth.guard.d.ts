import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthGuard implements CanActivate {
    private authservice;
    private readonly JwtService;
    constructor(authservice: AuthService, JwtService: JwtService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
