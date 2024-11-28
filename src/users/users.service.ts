import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserDTO } from './user.dto';
import { ComparePassword } from 'src/hash/compare/compare.middleware';

const prisma = new PrismaClient();
@Injectable()
export class UsersService {
  async create(createUserDto: Prisma.UsersCreateInput) {
    return prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await prisma.users.findMany();
  }

  async findByEmail(data: any) {
    try {
      return await prisma.users.findFirstOrThrow({
        where: { email: data },
        include: {
          role_relation: true,
        },
      });
    } catch (error) {
      return null;
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: Prisma.UsersUpdateInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
