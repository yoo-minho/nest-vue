import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  getToken(payload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: 'process.env.JWT_SECRET',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: 'process.env.JWT_SECRET',
    });

    return { accessToken, refreshToken };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async OAuthLogin({ req, res }) {
    console.log('OAuthLogin');
    return;
    // // 1. 회원조회
    // let user = await this.userService.findOne({ email: req.user.email }); //user를 찾아서

    // // 2, 회원가입이 안되어있다면? 자동회원가입
    // if (!user) user = await this.userService.create({ ...req.user }); //user가 없으면 하나 만들고, 있으면 이 if문에 들어오지 않을거기때문에 이러나 저러나 user는 존재하는게 됨.

    // // 3. 회원가입이 되어있다면? 로그인(AT, RT를 생성해서 브라우저에 전송)한다
    // this.setRefreshToken({ user, res });
    // res.redirect('리다이렉트할 url주소');
  }
}
