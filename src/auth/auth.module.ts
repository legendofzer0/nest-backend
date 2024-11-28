import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Secret for signing the JWT
      signOptions: { expiresIn: '1d' }, // Token expiration time (1 day)
    }),
    UsersModule, // Make sure UsersService is exported from this module
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule], // Export JwtModule if needed in other modules
})
export class AuthModule {}
