import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { UserService } from './user.service'

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = this.userService.findOne({ id: request.params.userId })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return true
  }
}
