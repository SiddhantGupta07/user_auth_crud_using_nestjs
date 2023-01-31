import { Controller, Body, Get, Post, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { RegisterDTO } from 'src/user/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginDTO } from 'src/auth/login.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private userService : UserService,
        private authService : AuthService,
    ){}

    //Authentication...
    @Get('users')
      async getAllUsers(){
        return await this.userService.findAllUsers();
      }
    

    //Getting the user by it's email id
    //Will take the email id as a parameter
    //Dynamic 
    @Get('/users/:email')
    async getUserByEmail(@Param('email') id : string){
      return await this.userService.findByPayload({email : id});
    }

    //Updating the user using id.
    //Taking th id as a parameter
    @Put('update/:id')
    @UseGuards(AuthGuard('jwt'))

    async updateUser(@Param('id') id: string, @Body() updateTodoDto: RegisterDTO) {
      return await this.userService.updateUser(id, updateTodoDto);
    }

    //Dynamic call
    //Deleting the user based on the id
    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt'))

    async deleteUser(@Param('id') id: string) {
      return await this.userService.deleteUser(id);
    }

    // Authorisation...
    @Post('register')
    async register(@Body() RegisterDTO: RegisterDTO){
        const user = await this.userService.create(RegisterDTO);
        const payload = {
            email: user.email,
        };
        console.log(user);
        const token = await this.authService.signPayLoad(payload);
        return {user,token};
    }

    @Post('login')
    async login(@Body() UserDTO: LoginDTO) {
      const data = await this.userService.findByLogin(UserDTO);
      
      const payload = {
        email: data.user.email,
      };
      const token = await this.authService.signPayLoad(payload);
      return { data, token};
    }
}
