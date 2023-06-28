import { IsString } from "class-validator";

export class CreateRequestDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly email: string;

    @IsString()
    readonly message: string;
}
