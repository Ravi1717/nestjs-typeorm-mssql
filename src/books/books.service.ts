import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {Book} from '../entities/book.entity';
import { BooksDTO } from './book.interface';

@Injectable()
export class BooksService {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private bookRepository: Repository<Book>,
    ) {}
    async findAll(){
        //return 'Hello from nestjs application!'
        return this.bookRepository.find();
    }
    async create(data: BooksDTO){
        const book = this.bookRepository.create(data);
        await this.bookRepository.save(data);
        return book;
    }

    async read(id:number){
        return await this.bookRepository.findOne({where:{id:id}});
    }

    async update(id: number, data: Partial<BooksDTO>){
        await this.bookRepository.update({id},data);
        return await this.bookRepository.findOne({where:{id:id}})
    }

    async delete(id: number){
       return await this.bookRepository.delete({id});
    }
}
