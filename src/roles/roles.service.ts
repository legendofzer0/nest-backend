import {
  HttpException,
  HttpStatus,
  Injectable,
  Response,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class RolesService {
  async create(createRoleDto: Prisma.RoleCreateInput) {
    return await prisma.role.create({ data: createRoleDto });
  }

  async findAll() {
    return await prisma.role.findMany();
  }

  async findOne(id: string) {
    try {
      return await prisma.role.findFirstOrThrow({
        where: {
          id: id,
        },
      });
    } catch {
      throw new HttpException('Role not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateRoleDto: Prisma.RoleUpdateInput) {
    try {
      return await prisma.role.update({
        where: {
          id: id,
        },
        data: {
          name: updateRoleDto.name,
        },
      });
    } catch {
      throw new HttpException('Role not Found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    try {
      return await prisma.role.delete({
        where: {
          id: id,
        },
      });
    } catch {
      throw new HttpException('Role not Found', HttpStatus.NOT_FOUND);
    }
  }
}
