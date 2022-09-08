import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
    constructor(private readonly bookService: BooksService){}

    @Get('/getAllBook')
    findAll(){
        return this.bookService.findAll();
    }
}
