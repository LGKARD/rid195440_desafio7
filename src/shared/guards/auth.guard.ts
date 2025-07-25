import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/users/user.services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return false;
    }

    const token = authorization.split(' ')[1];

    const { valid, decoded } = await this.authService.validateToken(token);

    if (!valid) return false;
    const user = await this.userService.show(Number(decoded!.sub));
    if (!user) return false;

    request.user = user;

    return true;
  }
}
