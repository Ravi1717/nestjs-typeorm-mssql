import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
    constructor(private readonly bookService: BooksService){}

    @Get('/getAllBook')
    async findAll(){
        const data = await this.bookService.findAll();
        console.log('nestjs data', data);
    }
}
