import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
        private readonly rolesService: RolesService
    ) {}

    async createUser(dto: CreateUserDto) {
        try {
            const newUser = await this.usersRepository.create(dto);
            const role = await this.rolesService.getRoleByValue('user');
            newUser.role = role

            return await this.usersRepository.save(newUser);
        } catch (e) {
            if (e.code === '23505') {
                throw new BadRequestException("Пользователь с такой почтой уже существует")
            }
        }
    }

    async getAllUsers(): Promise<CreateUserDto[]> {
        return await this.usersRepository.find({ relations: ['role'] });
    }
}
