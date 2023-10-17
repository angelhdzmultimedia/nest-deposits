import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

export const Roles = Reflector.createDecorator<string[]>()

function matchRoles(rolesA: string[], rolesB: string[]) {
  return rolesA.every((role) => rolesB.includes(role))
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.session.user
    return matchRoles(roles, user.roles)
  }
}
