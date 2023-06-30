import { Module } from "@nestjs/common";
import { NullEmailService } from "./null-email.service";

@Module({
    providers: [NullEmailService],
    exports: [NullEmailService]
})
export class EmailModule {}
