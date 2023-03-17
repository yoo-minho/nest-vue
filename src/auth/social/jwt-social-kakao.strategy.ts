import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID:
        process.env.KAKAO_CLIENT_ID || '2679fc8a025478e246579e841a3a8650',
      // clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL || '/api/auth/kakao/redirect',
      scope: ['profile_nickname', 'profile_image'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('validate accessToken : ' + accessToken);
    console.log('validate refreshToken : ' + refreshToken);
    console.log(profile);
    console.log(profile._json.kakao_account.email);

    //req.user에 담김
    return {
      name: profile.displayName,
      email: profile._json.kakao_account.email,
      password: profile.id,
    };
  }
}
