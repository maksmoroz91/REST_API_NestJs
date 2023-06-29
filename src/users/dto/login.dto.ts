import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: "admin@poch.ta", description: "Уникальная почта пользователя" })
    @IsString()
    readonly email: string;

    @ApiProperty({ example: "admin", description: "Пароль пользователя" })
    @IsString()
    readonly password: string;
}
