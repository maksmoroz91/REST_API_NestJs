import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service";
import { UserEntity } from "../users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userEntity: UserEntity): Promise<{token: string}> {
        const user = await this.usersService.findUserById(userEntity.id);
        const payload = { id: user.id, email: user.email, role: user.role.value}

        return {
            token: this.jwtService.sign(payload)
        };
    }

    async registration(dto: CreateUserDto): Promise<UserEntity> {
        const candidate = await this.usersService.findUserByEmail(dto.email);

        if (candidate) {
            throw new BadRequestException("Пользователь с такой почтой уже существует")
        }
        const adminPassword = process.env.ADMIN_PASSWORD;
        const checkAdminPassword: boolean = adminPassword === dto.password;
        const hashPassword = await bcrypt.hash(dto.password, 5);

        return this.usersService.createUser({...dto, password: hashPassword}, checkAdminPassword);
    }

    async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.usersService.findUserByEmail(email);

        if (user) {
            const passwordEquals: boolean = await bcrypt.compare(password, user.password);

            if (user && passwordEquals) {
                return user;
            }
        }

        return null;
    }
}
