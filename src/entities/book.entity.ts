import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}