import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { randomUUID } from 'crypto'

const users: any[] = []

@Injectable()
export class UserService {
  create(userData: any) {
    const user: any = {
      ...userData,
      id: randomUUID(),
    }
    users.push(user)

    return user
  }

  count(): number {
    return users.length
  }

  findOne(userData: any) {
    return users.find((user) => {
      return Object.keys(userData).every((key) => {
        return userData[key] === user[key]
      })
    })
  }
}
