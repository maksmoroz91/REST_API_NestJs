import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('users')
@ApiTags("Пользователи")
export class UsersController {

    constructor(private readonly usersService: UsersService) {}


    @Get()
    @ApiOperation({summary: 'Получение всех пользователей'})
    getAllUsers(): Promise<CreateUserDto[]> {
        return this.usersService.getAllUsers()
    }
}
