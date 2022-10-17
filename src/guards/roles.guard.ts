import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "src/entities/user.entity";
import { Role } from "src/enums/user.enum";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersDTO } from "src/books/user.interface";




@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService, private usersService: UsersService) {}
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }
    const reqBody = context.switchToHttp().getRequest();
    const tokenBearer = reqBody?.headers?.authorization ? (() => {
      const authHeader = <string>reqBody?.headers?.authorization || ``
      const [code,token] = authHeader.trim().split(` `)
      if (code !== `Bearer`)
          return void 0
      else
          return token
  })() : void 0

  
  let decodedJwtAccessToken = this.jwtService.decode(tokenBearer) as { [key: string]: any;
};

   if (decodedJwtAccessToken) {
     return requireRoles.some((role) => { 
      console.log(decodedJwtAccessToken.roles.includes(role))
     return decodedJwtAccessToken.roles.includes(role)
     //return false;
   });
   }
    return null;
  }
}