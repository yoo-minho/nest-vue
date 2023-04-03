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
    res.status(200).end();
  }

  @Get('/kakao/redirect')
  @UseGuards(KaKaoAuthGuard)
  async loginKakaoRedirect(@Req() req: Request, @Res() res: Response) {
    const isDev = process.env.NODE_ENV === 'development';
    const user = req.user as Prisma.UserCreateInput;
    const payload = { id: user.id };
    const { accessToken, refreshToken } = this.authService.getToken(payload);
    await this.userService.createUser({ ...user, refreshToken });
    res.cookie('access-token', accessToken, {
      path: '/',
      secure: !isDev,
      httpOnly: !isDev,
    });
    if (isDev) {
      res.send(`<script>
        location.href = 'http://127.0.0.1:8090/?code=${accessToken}';
        setTimeout(() => self.close(), 1500);
      </script>`);
    } else {
      res.send(`<script>self.close();</script>`);
    }
    res.status(200).end();
  }

  @Get('/logout')
  async logoutKakao(@Req() req: Request, @Res() res: Response) {
    const id = this.authService.getIdByToken(req.cookies['access-token']);
    res.clearCookie('access-token');
    this.userService.updateUserToken({ id, token: '' });
    res.status(200).end();
  }
}
