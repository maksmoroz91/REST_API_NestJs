import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from './users.service';
import { UserEntity } from "./entities/user.entity";
import { RoleEntity } from "../roles/entities/role.entity";
import { RolesModule } from "../roles/roles.module";

@Module({
    providers: [UsersService],
    imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity]),
        RolesModule
    ],
    exports: [UsersService]
})
export class UsersModule {}
