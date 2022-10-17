import { Injectable, Inject } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import {Book} from '../entities/book.entity';
import {User} from '../entities/user.entity';
import { BooksDTO } from './book.interface';
import { CategoryDTO } from './category.interface';
import { UsersDTO } from './user.interface';

@Injectable()
export class BooksService {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private bookRepository: Repository<Book>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        @Inject('CATEGORY_REPOSITORY')
        private categoryRepository: Repository<Category>,
    ) {}
    async findAll(){
        //return 'Hello from nestjs application!'
        return this.bookRepository.find();
    }
    async create(data: BooksDTO){
        let data2={};;
        //console.log('data', data);
        const user = await this.userRepository.findOne({where:{id:2}});
        const category = await this.categoryRepository.findOne({where:{name:'Action'}});
        console.log('category',category);
        data2={
            bookName: data.bookName,
            bookDescription: data.bookDescription,
            authorName: data.authorName,
            bookPrice: data.bookPrice,
            isPublished: data.isPublished,
            user:user,
            categories:[category]
        }
        //console.log('user db', user);
        console.log(data2)
        //const book = this.bookRepository.create(data2);
        return await this.bookRepository.save(data2);
        //return book;

        // let book = new Book()
        // book.bookName = data.bookName
        // book.bookDescription= data.bookDescription
        // book.authorName= data.authorName
        // book.bookPrice= data.bookPrice
        // book.isPublished= data.isPublished
        // book.user=user
        // book.categories= [category]
        // return await this.bookRepository.save(book);
    }

    async read(id:number){
        return await this.bookRepository.findOne({where:{id:id}});
    }

    async update(id: number, data: Partial<BooksDTO>){
        await this.bookRepository.update({id},data);
        //return await this.bookRepository.findOne({where:{id:id}})
    }

    async delete(id: number){
       return await this.bookRepository.delete({id});
    }

    async createUser(data: UsersDTO){
        const user = this.userRepository.create(data);
        await this.userRepository.save(data);
        return user;
    }

    async createCategory(data: CategoryDTO){
        const category = this.categoryRepository.create(data);
        await this.categoryRepository.save(data);
        return category;
    }

    async findUser(username: string, password: string){
        const user = this.userRepository.findOne({where:{name:username}});
        return user;
    }

    async getBookByProcedure(id:number){
        return await this.userRepository.query("getAllBooks @id='"+id+"'");
    }
}
