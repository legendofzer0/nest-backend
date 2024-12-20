import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ComparePassword } from 'src/hash/compare/compare.middleware';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(authPayload: { email: string; plainPassword: string }) {
    const user = await this.usersService.findByEmail(authPayload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await ComparePassword(
      authPayload.plainPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, ...userData } = user;
    return this.jwtService.sign(userData);
  }
  async decodeJWT(payload: { token: string }) {
    try {
      const data = await this.jwtService.decode(payload.token);
      return data;
    } catch {
      throw new HttpException('Token is Broken', HttpStatus.BAD_REQUEST);
    }
  }
}
