import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateDepositDto } from './dto/create-deposit.dto'
import { UpdateDepositDto } from './dto/update-deposit.dto'
import { randomUUID } from 'crypto'
import { NotFoundError } from 'rxjs'
import { UserService } from 'src/user/user.service'

const deposits: any[] = []

@Injectable()
export class DepositService {
  constructor(private readonly userService: UserService) {}

  create(userId: string, createDepositDto: CreateDepositDto) {
    const deposit: any = {
      ...createDepositDto,
      id: randomUUID(),
      userId,
      status: 'pending',
    }

    deposits.push(deposit)
    return deposit
  }

  findAll(userId: string) {
    return deposits.filter((deposit) => deposit.userId === userId)
  }

  approve(id: string) {
    const deposit: any = deposits.find((deposit) => deposit.id === id)

    if (!deposit) {
      throw new NotFoundException('Deposit not found')
    }

    deposit.status = 'approved'
    return deposit
  }
}
