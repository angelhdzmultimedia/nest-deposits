import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { DepositService } from './deposit.service'
import { CreateDepositDto } from './dto/create-deposit.dto'
import { UpdateDepositDto } from './dto/update-deposit.dto'
import { Reflector } from '@nestjs/core'
import { RoleGuard, Roles } from 'src/role/role.guard'
import { UserGuard } from 'src/user/user.guard'

@Controller('api/deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('/user/:userId')
  @UseGuards(UserGuard)
  create(
    @Body() createDepositDto: CreateDepositDto,
    @Param('userId') userId: string,
  ) {
    return this.depositService.create(userId, createDepositDto)
  }

  @Get('/all/user/:userId')
  @UseGuards(UserGuard)
  findAll(@Param('userId') userId: string) {
    return this.depositService.findAll(userId)
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.depositService.findOne(id)
  }

  @Patch('approve/:id')
  @Roles(['admin'])
  @UseGuards(RoleGuard)
  approve(@Param('id') id: string) {
    return this.depositService.approve(id)
  }
}
