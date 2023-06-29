import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from "./entities/role.entity";

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    createRole(@Body() dto: CreateRoleDto): Promise<RoleEntity> {
        return this.rolesService.createRole(dto)
    }

    @Get(':value')
    getRoleByValue(@Param('value') value: string): Promise<RoleEntity> {
        return this.rolesService.getRoleByValue(value);
    }
}
