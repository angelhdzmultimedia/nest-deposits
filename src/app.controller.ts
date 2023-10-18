import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index() {
    return this.appService.index()
  }

  @Get('login')
  login() {
    return this.appService.login()
  }

  @Get('register')
  register() {
    return this.appService.register()
  }

  @Get('admin')
  adminPanel() {
    return this.appService.adminPanel()
  }
}
