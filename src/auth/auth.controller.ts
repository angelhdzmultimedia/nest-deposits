import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { AuthGuard } from './auth.guard'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: any, @Session() session: any) {
    const authenticatedUser: any = await this.authService.login(loginData)
    session.user = authenticatedUser
    return authenticatedUser
  }

  @Post('register')
  register(@Body() registerData: any) {
    return this.authService.register(registerData)
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  findProfile(@Session() session: any) {
    return session.user
  }
}
