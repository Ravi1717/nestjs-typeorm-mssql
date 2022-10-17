import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { BooksDTO } from './book.interface';
import { BooksService } from './books.service';
import { ValidationPipe } from 'src/custom-pipes/validation.pipe';
import { Role } from 'src/enums/user.enum';
import {Roles} from '../custom-decorator/roles.decorator';
import { UsersDTO } from './user.interface';
import { UserCheck } from 'src/custom-decorator/user.decorator';
import { User } from 'src/entities/user.entity';
import { CategoryDTO } from './category.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import PermissionGuard from '../guards/permissions.guard';
import { Permission } from 'src/enums/permission.enum';

@Controller()
export class BooksController {
    constructor(private readonly bookService: BooksService){}

    @Get('/getAllBooks')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(PermissionGuard(Permission.CreateCategory))
    @HttpCode(200)
    async getAllBooks():Promise<object>{
        const data = await this.bookService.findAll();
        console.log('nestjs data', data);
        return data;
    }

    @Post('/createBook')
    @Roles(Role.ADMIN)
    @UseGuards(PermissionGuard(Permission.CreateCategory))
    async createBooks(@Body() data:BooksDTO):Promise<object>{
        const user = await this.bookService.create(data);
        return{
            statusCode: HttpStatus.OK,
            message: 'User created successfully',
            user
        }
    }

    @Get('/readBook/:id')
    async readBook(@Param('id',ValidationPipe) id:number){
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

    @Post('/createUser')
    async createUser(@UserCheck() user2:User, @Body() data:UsersDTO):Promise<object>{
        console.log('user check returning in context', user2)
        const user = await this.bookService.createUser(data);
        return{
            statusCode: HttpStatus.OK,
            message: 'User created successfully',
            user
        }
    }

    @Post('/createCategory')
    async createCategory(@Body() data:CategoryDTO):Promise<object>{
        const category = await this.bookService.createCategory(data);
        return{
            statusCode: HttpStatus.OK,
            message: 'Category created successfully',
            category
        }
    }

    @Get('/readBookByProcedure/:id')
    async getBookByProcedure(@Param('id') id:number){
        const data = await this.bookService.getBookByProcedure(id);
        return{
            statusCodee: HttpStatus.OK,
            message:'Book fetched successfully',
            data,
        }
    }
}
