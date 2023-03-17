import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    // 유저정보저장로직
    const user = req.user as { id: number };
    const payload = { id: user.id };
    const { accessToken, refreshToken } = this.authService.getToken(payload);
    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);
    console.log({ accessToken, refreshToken });
    // 리프레시토큰저장로직
    res.redirect('/');
    return;
  }

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Req() req: Request, @Res() res: Response) {
    return;
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(@Req() req: Request, @Res() res: Response) {
    this.authService.OAuthLogin({ req, res });
  }

  @Get('favicon.ico')
  favicon(@Req() req: Request, @Res() res: Response) {
    res.status(204).end();
  }
}
