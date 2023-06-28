import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: "test@poch.ta", description: "Уникальная почта пользователя"})
    @IsString()
    readonly email: string;

    @ApiProperty({example: "qwerty", description: "Пароль пользователя"})
    @IsString()
    readonly password: string;
}
