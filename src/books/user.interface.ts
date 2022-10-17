import { Role } from "src/enums/user.enum";

export interface UsersDTO {
    id: number;
    name: string;
    password: string;
    address: string;
    roles: Role;
}