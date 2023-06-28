import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesEntity } from "./entities/roles.entity";
import { UserEntity } from "../users/entities/user.entity";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
      TypeOrmModule.forFeature([RolesEntity, UserEntity])
  ],
    exports: [RolesService]
})
export class RolesModule {}
