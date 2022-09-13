import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { BooksDTO } from './book.interface';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
    constructor(private readonly bookService: BooksService){}

    @Get('/getAllBooks')
    async getAllBooks(){
        const data = await this.bookService.findAll();
        console.log('nestjs data', data);
        return data;
    }

    @Post('/createBook')
    async createBooks(@Body() data:BooksDTO){
        const user = await this.bookService.create(data);
        return{
            statusCode: HttpStatus.OK,
            message: 'User created successfully',
            user
        }
    }

    @Get('/readBook/:id')
    async readBook(@Param('id') id:number){
        const data = await this.bookService.read(id);
        return{
            statusCodee: HttpStatus.OK,
            message:'Book fetched successfully',
            data,
        }
    }

    @Patch('/updateBook/:id')
    async updateBook(@Param('id') id: number, @Body() data:Partial<BooksDTO>){
        await this.bookService.update(id, data);
        return{
            statusCode: HttpStatus.OK,
            message: 'Book updated successfully',
            data
        }
    }

    @Delete('/deleteBook/:id')
    async deleteBook(@Param('id') id:number){
        await this.bookService.delete(id);
        return{
            statusCode: HttpStatus.OK,
            message: 'Book deleted successfully'
        }
    }
}
