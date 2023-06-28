import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRequestDto {
    @ApiProperty({example: "Maks", description: "Имя пользователя"})
    @IsString()
    readonly name: string;

    @ApiProperty({example: "test@poch.ta", description: "Почта пользователя"})
    @IsString()
    readonly email: string;

    @ApiProperty({example: "Хочу приобрести это и то", description: "Сообщение пользователя"})
    @IsString()
    readonly message: string;
}
