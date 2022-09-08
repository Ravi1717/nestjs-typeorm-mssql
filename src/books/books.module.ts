import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { DatabaseModule } from 'src/database/database.module';
import { bookProviders } from 'src/entities/book.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [...bookProviders, BooksService]
})
export class BooksModule {}
