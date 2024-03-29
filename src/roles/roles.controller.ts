import { Controller, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RoleEntity } from "./entities/role.entity";

@Controller("roles")
@ApiTags("Роли")
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @ApiOperation({summary: "Создание роли (user, admin)"})
    createRole(@Body() dto: CreateRoleDto): Promise<RoleEntity> {
        return this.rolesService.createRole(dto)
    }
}
