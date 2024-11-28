import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = this.extractToken(authHeader);
    try {
      const decoded = this.jwtService.decode(token);

      if (decoded.role_relation.name === 'admin') {
        return true;
      }
      return false;
    } catch (err) {
      throw new UnauthorizedException(
        `Invalid or expired token: ${err.message}`,
      );
    }
  }

  private extractToken(authHeader: string): string {
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization header format');
    }
    return parts[1];
  }
}
