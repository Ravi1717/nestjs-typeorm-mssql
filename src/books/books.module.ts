import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { DatabaseModule } from 'src/database/database.module';
import { bookProviders } from 'src/entities/book.providers';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';


@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [...bookProviders, BooksService]
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .forRoutes(BooksController);
  }
}
