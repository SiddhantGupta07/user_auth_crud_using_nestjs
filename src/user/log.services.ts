import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RegisterDTO } from "src/user/register.dto";
import { LogDTO } from "../log/log.dto";
import { Log } from "../log/log.interface";


@Injectable()
export class LogService {
    
    constructor(
    @InjectModel('Log') private logModel : Model <Log>){}

    
    async logger(LogDTO : LogDTO) {
        const log = new this.logModel(LogDTO);
        return await log.save();
        
    }

}