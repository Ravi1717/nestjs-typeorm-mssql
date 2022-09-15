import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [BooksModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass:RolesGuard,
  }],
})
export class AppModule {}
