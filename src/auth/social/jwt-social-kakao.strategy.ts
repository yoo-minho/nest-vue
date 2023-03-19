import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID:
        process.env.KAKAO_CLIENT_ID || '2679fc8a025478e246579e841a3a8650',
      // clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL || '/api/auth/kakao/redirect',
      scope: ['profile_nickname', 'profile_image', 'account_email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('kakao validate', { profile, accessToken, refreshToken });
    return {
      id: 'KAKAO_' + profile._json.id,
      name: profile._json.properties.nickname,
      profileImage: profile._json.properties.thumbnail_image,
    };
  }
}
