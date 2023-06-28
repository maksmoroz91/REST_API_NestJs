import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRequestDto {
    @ApiProperty({example: "Отлично! Это будет стоить вот эту сумму и ту", description: "Ответ ответственного лица"})
    @IsString()
    readonly comment: string;
}
