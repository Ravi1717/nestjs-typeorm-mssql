import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, private jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('validate username',username)
    const user = await this.usersService.findUser(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      console.log('result', result);
      return result;
    }
    // if(user){
    //   return user
    // }
    return null;
  }

  async login(user:any){
    console.log('login  check',user);
    const payload = {username: user.name, sub: user.id};
    console.log('payload',payload)
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}


