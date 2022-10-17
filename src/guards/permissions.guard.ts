import { Injectable, CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
//import RequestWithUser from '../authentication/requestWithUser.interface';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {Permission} from '../enums/permission.enum';
import { Reflector } from "@nestjs/core";

 
const PermissionGuard = (permission: Permission): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
 
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      console.log('user', user);
      console.log('permission', permission);
 
      return user?.permissions.includes(permission);
    }
  }
 
  return mixin(PermissionGuardMixin);
}
 
export default PermissionGuard;

// @Injectable()
// export class PermissionGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//   canActivate(context: ExecutionContext): boolean {
//     const permissionCheck = this.reflector.getAllAndOverride<Permission[]>("permissions", [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!permissionCheck) {
//       return true;
//     }
//           const request = context.switchToHttp().getRequest();
//       const user = request.user;

//       if (user) {
//         return permissionCheck.some((permission) => { 
//          console.log(user.permissions.includes(permission))
//         return user.permissions.includes(permission)
//         //return false;
//       });
//       }
//        return null;
//      }
// }

// export default PermissionGuard;