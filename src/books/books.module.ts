import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { DatabaseModule } from 'src/database/database.module';
import { bookProviders } from 'src/entities/book.providers';
import { userProviders } from 'src/entities/user.provider';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { categoryProviders } from 'src/entities/category.provider';


@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [...bookProviders,...userProviders,...categoryProviders, BooksService]
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .forRoutes(BooksController);
  }
}
