import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RoleEntity } from "./entities/role.entity";

@Injectable()
export class RolesService {

    constructor(@InjectRepository(RoleEntity) private readonly rolesRepository: Repository<RoleEntity>) {}

    async createRole(dto: CreateRoleDto): Promise<RoleEntity> {
        const role = await this.getRoleByValue(dto.value);

        if (role) {
            throw new BadRequestException('Такая роль уже есть')
        }
        const newRole = await this.rolesRepository.create(dto);

        return await this.rolesRepository.save(newRole);
    }

    async getRoleByValue(value: string): Promise<RoleEntity> {
        return await this.rolesRepository.findOne({where: {value}});
    }
}
