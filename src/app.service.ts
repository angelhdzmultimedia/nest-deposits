import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  index(): string {
    return '<h1>NestJS - Home</h1>'
  }
}
