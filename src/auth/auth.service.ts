import { Injectable } from '@nestjs/common';
import {PayLoad} from 'src/models/payload';
import {UserService} from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private userService : UserService, private jwtService : JwtService){

    }

    async signPayLoad(payload : PayLoad){
        return this.jwtService.sign(payload);
    }

    async validateUser(payload: PayLoad){
        return await  this.userService.findByPayload(payload);
    }
   
}
