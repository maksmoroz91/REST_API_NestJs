import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LocalAuthGuard } from "./guards/local.guard";
import { UserEntity } from "../users/entities/user.entity";

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiOperation({summary: "Аутентификация"})
    @Post("login")
    @ApiBody({type: CreateUserDto})
    async login(@Request() dto: CreateUserDto): Promise<{token: string}> {
        return this.authService.login(dto);
    }

    @ApiOperation({summary: "Регистрация"})
    @Post("registration")
    async registration(@Body() dto: CreateUserDto): Promise<UserEntity> {
        return this.authService.registration(dto);
    }
}
