import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from '../models/user.schema';
import { UserService } from './user.service';
import { LogSchema } from 'src/log/log.shema';
import { LogService } from './log.services';

@Module({
  imports: [MongooseModule.forFeature([{name : 'User', schema: UserSchema}]),
  MongooseModule.forFeature([{name : 'Log', schema : LogSchema}])],
  providers: [UserService, LogService],
  controllers: [],
  exports: [UserService]
})
export class UserModule {}
