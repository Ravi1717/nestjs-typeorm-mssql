import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {User} from '../entities/user.entity';



//This should be a real class/interface representing a user entity
//export type User = any;

@Injectable()
export class UsersService {
  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'Ravi',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    
) {}

  async findUser(username: string){
    console.log('user service username', username)
    const user = this.userRepository.findOne({where:{name:username}});
    return user;
}
}