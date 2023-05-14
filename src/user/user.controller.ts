import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async findById(@Req() req: Request) {
    const jwtPayload = req.user as { id: string; iat: number; exp: number };
    const { id, iat, exp } = jwtPayload;
    if (!id) return {};

    const response = await this.userService.userById({ id });
    const { refreshToken, ...data } = response;
    const now = new Date().getTime() / 1000;
    const isNearExpiration = (exp - iat) * 0.3 > exp - now;
    if (isNearExpiration) {
      console.log('만료 되기 30% 지점?');
    }
    return data;
  }
}
