import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "./service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject(AuthService) private authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")){
      return false;
    }
    const token = authHeader.substring(7, authHeader.length);
    const user = await this.authService.verifyDiscordToken(token);
    return user?.verified;
  }
}