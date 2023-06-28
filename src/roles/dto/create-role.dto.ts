import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: "admin", description: "Роль пользователя"})
    @IsString()
    readonly value: string;
}
