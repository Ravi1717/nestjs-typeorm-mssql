import { DataSource } from "typeorm";
import {Book} from './book.entity';
import{User} from './user.entity';


export const bookProviders = [
    {
        provide: 'BOOK_REPOSITORY',
        useFactory:(dataSource: DataSource) => dataSource.getRepository(Book),
        inject: ['DATA_SOURCE'],
    }
]

