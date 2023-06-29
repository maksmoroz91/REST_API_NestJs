import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from "./entities/role.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('roles')
@ApiTags("Роли")
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @ApiOperation({summary: 'Создание роли'})
    createRole(@Body() dto: CreateRoleDto): Promise<RoleEntity> {
        return this.rolesService.createRole(dto)
    }

    @Get(':value')
    @ApiOperation({summary: 'Вернет роль по значению (user, admin)'})
    getRoleByValue(@Param('value') value: string): Promise<RoleEntity> {
        return this.rolesService.getRoleByValue(value);
    }
}
