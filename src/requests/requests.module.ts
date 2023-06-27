import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { RequestEntity } from "./entities/request.entity";

@Module({
  controllers: [RequestsController],
  providers: [RequestsService],
  imports: [TypeOrmModule.forFeature([RequestEntity])]
})
export class RequestsModule {}
