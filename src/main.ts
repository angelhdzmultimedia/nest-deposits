import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    session({
      secret: 'as0d9a0sdas9da0s9das-0d',
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 24,
      },
      resave: false,
      saveUninitialized: false,
    }),
  )
  await app.listen(5000)
}
bootstrap()//
