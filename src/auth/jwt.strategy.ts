import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";


import { ExtractJwt, VerifiedCallback } from "passport-jwt";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private userService : AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey  : "siddhant",
        });
    }

    async validate(payload : any, done : VerifiedCallback): Promise<any>{
        const user = await this.userService.validateUser(payload);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}