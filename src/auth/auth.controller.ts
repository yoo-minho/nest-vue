import {
  Controller,
  Get,
  Ip,
  Query,
  Req,
  Res,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { KaKaoAuthGuard } from 'src/common/guards/kakao-auth.guard';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AccessService } from 'src/access/access.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly accessService: AccessService,
  ) {}

  @Get('/kakao')
  @UseGuards(KaKaoAuthGuard)
  async loginKakao(@Req() req: Request, @Res() res: Response) {
    res.status(200).end();
  }

  @Get('/kakao/redirect')
  @UseGuards(KaKaoAuthGuard)
  async loginKakaoRedirect(
    @Req() req: Request,
    @Res() res: Response,
    @Ip() ip: string,
    @Headers('user-agent') ua,
  ) {
    const isDev = process.env.NODE_ENV === 'development';
    const user = req.user as Prisma.UserCreateInput;
    const payload = { id: user.id };
    const { accessToken, refreshToken } = this.authService.getToken(payload);
    await this.userService.createUser({ ...user, refreshToken });
    await this.accessService.create({ id: user.id, ua, ip, apiName: 'login' });
    res.cookie('refresh-token', refreshToken, {
      path: '/',
      secure: !isDev,
      httpOnly: true,
    });
    res.redirect(302, `http://localhost:3000/my?code=${accessToken}`);
    res.status(200).end();
  }

  @Get('/refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
    @Ip() ip: string,
    @Headers('user-agent') ua,
  ) {
    //1. jwt 유효 체크
    const jwtPayload = req.user as { id: string; iat: number; exp: number };
    const { id } = jwtPayload;

    //2. 디비 유효 체크
    const token = this.getBearerToken(req);
    const user = await this.userService.userById({ id });
    const _isTokenMatchedInDB = token === user.refreshToken;
    // console.log({ reqToken: token, dbToken: user.refreshToken });

    if (!_isTokenMatchedInDB) {
      res.send({ atk: '', rtk: '', message: 'Not Token Matched In DB!' });
      return;
    }

    //3. 토큰 재발행
    const { accessToken, refreshToken } = this.authService.getToken({ id });
    this.userService.updateUserToken({ id, token: refreshToken });

    //4. 액세스 로그 생성
    await this.accessService.create({ id, ua, ip, apiName: 'refresh' });

    res.send({ atk: accessToken, rtk: refreshToken });
  }

  @Get('/refresh/atk')
  @UseGuards(JwtAuthGuard)
  async refreshAtk(
    @Req() req: Request,
    @Res() res: Response,
    @Ip() ip: string,
    @Headers('user-agent') ua,
  ) {
    //1. jwt 유효 체크
    const jwtPayload = req.user as { id: string; iat: number; exp: number };
    const { id } = jwtPayload;

    //2. 디비 유효 체크
    const token = this.getBearerToken(req);
    const params = { id, token };
    const _isTokenMatchedInDB = await this.userService.isTokenMatchedInDB(
      params,
    );

    if (!_isTokenMatchedInDB) {
      res.send({ atk: '', message: 'Not Token Matched In DB!' });
      return;
    }

    //3. 토큰 재발행
    const { accessToken } = this.authService.getToken({ id });

    //4. 액세스 로그 생성
    await this.accessService.create({ id, ua, ip, apiName: 'refresh/atk' });

    res.send({ atk: accessToken });
  }

  @Get('/refresh/test')
  @UseGuards(JwtAuthGuard)
  async refreshTest(@Req() req: Request, @Res() res: Response) {
    res.send(200);
  }

  @Get('/logout')
  async logoutKakao(
    @Query('id') id: string,
    @Res() res: Response,
    @Ip() ip: string,
    @Headers('user-agent') ua,
  ) {
    this.userService.updateUserToken({ id, token: '' });
    await this.accessService.create({ id, ua, ip, apiName: 'logout' });
    res.cookie('refresh-token', '');
    res.redirect(302, `http://localhost:3000/`);
    res.status(200).end();
  }

  getBearerToken(req: Request) {
    if (req.headers.authorization?.split(' ')[0] === 'Bearer') {
      return req.headers.authorization?.split(' ')[1] || '';
    }
    return '';
  }
}
