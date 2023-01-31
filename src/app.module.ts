import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import  {MongooseModule} from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot('mongodb://127.0.0.1:27017')
  ,UserModule,
  AuthModule,  
  PassportModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
