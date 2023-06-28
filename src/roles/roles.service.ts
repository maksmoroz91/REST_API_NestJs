import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { RolesEntity } from "./entities/roles.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {

    constructor(@InjectRepository(RolesEntity) private readonly rolesRepository: Repository<RolesEntity>) {
    }

    async createRole(dto: CreateRoleDto): Promise<RolesEntity> {
        const newRole = await this.rolesRepository.create(dto);
        return await this.rolesRepository.save(newRole);
    }

    async getRoleByValue(value: string): Promise<RolesEntity> {
        return await this.rolesRepository.findOne({where: {value}});
    }
}
