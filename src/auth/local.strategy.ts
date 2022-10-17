import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('local-strategy-username', username);
    const user = await this.authService.validateUser(username, password);
    console.log('user',user)
    if (!user) {
      console.log("exception throwing Hello world")
      throw new UnauthorizedException();
    }
    return user;
  }
}
