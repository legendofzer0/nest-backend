import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Prisma } from '@prisma/client';
import { IsAuthorizedGuard } from 'src/auth/is-authorized/is-authorized.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(IsAuthorizedGuard)
  create(@Body() createRoleDto: Prisma.RoleCreateInput) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @UseGuards(IsAuthorizedGuard)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @UseGuards(IsAuthorizedGuard)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(IsAuthorizedGuard)
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: Prisma.RoleUpdateInput,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(IsAuthorizedGuard)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
