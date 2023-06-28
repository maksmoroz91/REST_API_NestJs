import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { RolesEntity } from "../roles/entities/roles.entity";
import { RolesModule } from "../roles/roles.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        TypeOrmModule.forFeature([UserEntity, RolesEntity]),
        RolesModule
    ]
})
export class UsersModule {}
