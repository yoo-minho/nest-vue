import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    try {
      //최초 로그인
      return await this.prisma.user.create({ data });
    } catch (e) {
      const { name, message, stack } = e;
      if (message.includes('Unique constraint failed')) {
        //이후 로그인
        this.updateUserToken({ id: data.id, token: data.refreshToken });
        return;
      }
      throw e;
    }
  }

  async userById(params: { id: string }): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: params.id } });
  }

  async updateUserToken(params: { id: string; token: string }): Promise<User> {
    return this.prisma.user.update({
      data: { refreshToken: params.token },
      where: { id: params.id },
    });
  }
}
