import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "./entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {

    constructor(@InjectRepository(RoleEntity) private readonly rolesRepository: Repository<RoleEntity>) {
    }

    async createRole(dto: CreateRoleDto): Promise<RoleEntity> {
        const newRole = await this.rolesRepository.create(dto);
        return await this.rolesRepository.save(newRole);
    }

    async getRoleByValue(value: string): Promise<RoleEntity> {
        return await this.rolesRepository.findOne({where: {value}});
    }
}
