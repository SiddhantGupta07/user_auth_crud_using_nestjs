import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../models/user.interface';
import { PayLoad } from 'src/models/payload';
import {Log} from '../log/log.interface'
import { RegisterDTO } from './register.dto';
import { LoginDTO } from '../auth/login.dto';
import {LogDTO} from '../log/log.dto'
import * as bcrypt from 'bcrypt';
import { LogService } from 'src/user/log.services';



@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel : Model <User>,
    @InjectModel('Log') private logModel : Model <Log>,
    private logService : LogService){}

    async create(RegisterDTO: RegisterDTO) {
        const { email } = RegisterDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
          throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(RegisterDTO);
        await createdUser.save();
        
        return this.sanitizeUser(createdUser);
      }
    
      //Function to check whether a particular email id and password exist or not 
      async findByLogin(UserDTO: LoginDTO) {
        const { email, password } = UserDTO;
        const user = await this.userModel.findOne({ email });
        
        var logg_info : LogDTO;
          logg_info = {
          activity_type : "login",
          activity_data : "User",
          activity_date : new Date(),
        }
        if (!user) {
          throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
        }
        if (await bcrypt.compare(password, user.password)) {
          const log = await this.logService.logger(logg_info);
          return {Log : log, user : this.sanitizeUser(user)};
        } else {
          throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
        }
      }

      //Function to find the user based on the email id (generally, we do it on the basis of payload)
      async findByPayload(payload: PayLoad) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
      }

      //Function to find all the users in the database
      async findAllUsers() : Promise <User []>{

        let data = await this.userModel.find({});
        let users = [];
        for(let i in data){
          users.push(this.sanitizeUser(data[i]));
        }
        return users;
      }

      //Function to Update the user entry.
      async updateUser(id: string, RegisterDTO: RegisterDTO) {

        var logg_info : LogDTO;
        RegisterDTO.password = await bcrypt.hash(RegisterDTO.password,10);
        var user = await this.userModel.findByIdAndUpdate(id, RegisterDTO).exec();
        
        logg_info = {
          activity_type : "update",
          activity_data : "User",
          activity_date : new Date(),
        }
        const log = await this.logService.logger(logg_info);
        return {log : log, user_update : this.sanitizeUser(user)};
      }
      

      //Deleting the User based on the _id.
      async deleteUser(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id).exec();
      }

      //Function to remove password so that it is not returned while returning the object.
      sanitizeUser(user: User) {
        const sanitized = user.toObject();
        //console.log(user.toObject());
        delete sanitized['password'];
        return sanitized;
      }

      
}
