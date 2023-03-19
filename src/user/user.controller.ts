import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findById(@Req() req: Request) {
    const accessToken = req.cookies['access-token'];
    if (!accessToken) return {};
    const id = this.authService.getIdByToken(req.cookies['access-token']);
    const response = await this.userService.userById({ id });
    const { refreshToken, ...data } = response;
    return data;
  }
}
