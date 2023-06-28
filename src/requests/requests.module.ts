import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { RequestEntity } from "./entities/request.entity";
import { EmailModule } from "../email/email.module";

@Module({
    controllers: [RequestsController],
    providers: [RequestsService],
    imports: [
        TypeOrmModule.forFeature([RequestEntity]),
        EmailModule
    ]
})
export class RequestsModule {}
