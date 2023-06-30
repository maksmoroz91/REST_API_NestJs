import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
        private readonly rolesService: RolesService
    ) {
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        return await this.usersRepository.findOneBy({ email });
    }

    async findUserById(id: number): Promise<UserEntity> {
        return await this.usersRepository.findOne({
            where: { id },
            relations: ["role"]
        });
    }

    async createUser(dto: CreateUserDto, checkAdminPassword: boolean): Promise<UserEntity> {
        const newUser = await this.usersRepository.create(dto);
        const roleValue = checkAdminPassword ? "admin" : "user";
        newUser.role = await this.rolesService.getRoleByValue(roleValue);

        return await this.usersRepository.save(newUser);
    }
}
