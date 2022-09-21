import { Category } from "src/entities/category.entity";

export interface BooksDTO {
    id: number;
    bookName: string;
    bookDescription: string;
    authorName: string;
    bookPrice: number;
    isPublished: boolean;
    userId:number;
    categories:Category[]
}