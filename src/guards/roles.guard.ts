import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "src/entities/user.entity";
import { Role } from "src/enums/user.enum";


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }
    //const {user}=context.switchToHttp().getRequest();
    const user: User = {
      id:5,
      name: "Nishant",
      roles: Role.ADMIN,
      address:'kolkata'
    };
    return requireRoles.some((role) => user.roles.includes(role));
  }
}