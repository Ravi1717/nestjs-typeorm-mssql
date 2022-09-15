import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/enums/user.enum";

export type UserRoleType = "admin" | "user"


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string

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
}