import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: "email",
        });
    }

    async validate(email: string, password: string): Promise<{token: string}> {
        const tokenUser = await this.authService.validateUser(email, password);
        if (!tokenUser) {
            throw new UnauthorizedException("Неверная почта или пароль");
        }
        return tokenUser;
    }
}
