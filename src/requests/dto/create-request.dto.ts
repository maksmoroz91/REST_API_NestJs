import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRequestDto {

    @ApiProperty({example: "Хочу приобрести это и то", description: "Сообщение пользователя"})
    @IsString()
    readonly message: string;
}
