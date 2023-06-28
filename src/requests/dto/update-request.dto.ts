import { IsString } from "class-validator";

export class UpdateRequestDto {
    @IsString()
    readonly comment: string;
}
