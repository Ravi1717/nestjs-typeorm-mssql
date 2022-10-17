import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from 'src/entities/user.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  providers: [...userProviders, UsersService],
  exports:[UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
