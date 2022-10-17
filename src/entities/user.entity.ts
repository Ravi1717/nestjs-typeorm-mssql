import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Role } from "src/enums/user.enum";
import { Book } from "./book.entity";
import { Permission } from "src/enums/permission.enum";

export type UserRoleType = "admin" | "user"


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string

    @Column({ nullable: true })
    password: string

    @Column({ length: 500 })
    address: string

    @Column(
        {
            //type: "simple-enum",
            enum: Role,
            default: "user",
        }
    )
    roles: Role

    @Column({
        enum: Permission,
        default:"CreateCategory"
    })
    permissions: Permission

    @OneToMany(() => Book, (book) => book.user)
    books: Book[]
}