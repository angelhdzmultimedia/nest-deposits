import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { UserService } from 'src/user/user.service'
import { compare, hash } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginData: any) {
    const user = this.userService.findOne({ email: loginData.email })

    if (!user) {
      throw new NotFoundException('Email not found')
    }

    const isPasswordValid: boolean = await compare(
      loginData.password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password not valid')
    }

    const { password, ...authenticatedUser } = user
    return authenticatedUser
  }

  async register(registerData: any) {
    const user = this.userService.findOne({ email: registerData.email })

    if (user) {
      throw new ConflictException('Email already exists')
    }

    const createdUser = await this.userService.create({
      ...registerData,
      balance: 0,

      password: await hash(registerData.password, 10),
      roles: this.userService.count() === 0 ? ['user', 'admin'] : ['user'],
    })

    const { password, ...partialUser } = createdUser

    return partialUser
  }
}
