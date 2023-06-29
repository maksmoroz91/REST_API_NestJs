import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { LoginDto } from "./login.dto";

export class CreateUserDto extends LoginDto{
    @ApiProperty({example: "Maks", description: "Имя пользователя"})
    @IsString()
    readonly name: string;
}
