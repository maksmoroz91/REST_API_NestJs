import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { RequestEntity } from "./entities/request.entity";
import { EmailModule } from "../email/email.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";

@Module({
    controllers: [RequestsController],
    providers: [RequestsService],
    imports: [
        TypeOrmModule.forFeature([RequestEntity]),
        EmailModule,
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get("SECRET_KEY"),
                    signOptions: { expiresIn: configService.get("EXPIRES_IN")}
                };
            },
        }),
    ]
})
export class RequestsModule {}
