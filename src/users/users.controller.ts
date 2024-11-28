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
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { UserDTO } from './user.dto';
import { IsLoggedInGuard } from 'src/auth/is-logged-in/is-logged-in.guard';
import { IsAuthorizedGuard } from 'src/auth/is-authorized/is-authorized.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UsersCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(IsLoggedInGuard)
  @UseGuards(IsAuthorizedGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(IsLoggedInGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(IsLoggedInGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UsersUpdateInput,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(IsLoggedInGuard)
  @UseGuards(IsAuthorizedGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
