import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {Book} from '../entities/book.entity';

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
}
