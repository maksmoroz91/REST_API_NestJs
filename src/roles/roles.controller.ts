import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesEntity } from "./entities/roles.entity";

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    createRole(@Body() dto: CreateRoleDto): Promise<RolesEntity> {
        return this.rolesService.createRole(dto)
    }

    @Get(':value')
    getRoleByValue(@Param('value') value: string): Promise<RolesEntity> {
        return this.rolesService.getRoleByValue(value);
    }
}
