import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<string>('role', context.getHandler());

        if (!requiredRole) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];
        const user = this.jwtService.verify(token);


        if (user.role !== requiredRole) {
            throw new ForbiddenException('Доступ закрыт. Вы не ADMIN');
        }

        return true;
    }
}
