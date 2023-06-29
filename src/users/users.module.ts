import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { RoleEntity } from "../roles/entities/role.entity";
import { RolesModule } from "../roles/roles.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity]),
        RolesModule
    ]
})
export class UsersModule {}
