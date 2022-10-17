import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import {User} from '../entities/user.entity';
import { Category } from "./category.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    bookName: string

    @Column('text')
    bookDescription: string

    @Column({ length: 50 })
    authorName: string

    @Column()
    bookPrice: number

    @Column()
  isPublished: boolean

  @ManyToOne(() => User, (user) => user.books)
    user: User

  @ManyToMany(()=> Category)
  @JoinTable()
  categories: Category[]  
}