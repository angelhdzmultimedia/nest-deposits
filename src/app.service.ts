import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'
import { indexPage } from './pages'
import { adminPanelPage } from './pages/admin-panel'
import { loginPage } from './pages/login'
import { registerPage } from './pages/register'


@Injectable()
export class AppService {
  index(): string {
    return indexPage()
  }

  adminPanel() {
    return adminPanelPage()
  }

  register() {
   return registerPage()
  }

  login() {
   return loginPage()
  }
}
