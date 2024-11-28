import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
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
    try {
      const create = this.usersService.create(createUserDto);
      return create;
    } catch {
      throw new HttpException('User Aleady Exists', HttpStatus.CONFLICT);
    }
  }

  @Get()
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
