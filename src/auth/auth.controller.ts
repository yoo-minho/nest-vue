import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { KaKaoAuthGuard } from 'src/common/guards/kakao-auth.guard';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/kakao')
  @UseGuards(KaKaoAuthGuard)
  async loginKakao(@Req() req: Request, @Res() res: Response) {
    res.status(200);
    return;
  }

  @Get('/kakao/redirect')
  @UseGuards(KaKaoAuthGuard)
  async loginKakaoRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as Prisma.UserCreateInput;
    const payload = { id: user.id };
    const { accessToken, refreshToken } = this.authService.getToken(payload);
    res.cookie('access-token', accessToken, { httpOnly: true });
    await this.userService.createUser({ ...user, refreshToken });
    res.redirect('/');
  }
}
