import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    userName: string

    @Column('text')
    image: string

    @Column({ length: 50 })
    address: string

    @Column()
    phone: number

    @Column()
    state: string
}