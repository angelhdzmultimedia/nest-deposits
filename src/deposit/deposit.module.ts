import { Module } from '@nestjs/common'
import { DepositService } from './deposit.service'
import { DepositController } from './deposit.controller'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { UserGuard } from 'src/user/user.guard'

@Module({
  imports: [UserModule],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
