import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [JwtModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
