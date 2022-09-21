import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class  Category{
@PrimaryGeneratedColumn()    
id: number;

@Column()
name:string

// @ManyToMany(()=> Book)
//   book: Book[]  

}