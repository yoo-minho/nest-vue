import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(payload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 60,
      secret: 'process.env.JWT_SECRET',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: 'process.env.JWT_SECRET',
    });

    return { accessToken, refreshToken };
  }

  getIdByToken(token) {
    const res = this.jwtService.decode(token);
    return res['id'];
  }
}
