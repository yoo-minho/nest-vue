import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(payload: string | object) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });
    return { accessToken, refreshToken };
  }

  getIdByToken(token: string) {
    if (!token) return '';
    if (token.includes('Bearer ')) token = token.replace('Bearer ', '');
    if (!token) return '';
    const res = this.jwtService.decode(token);
    return res['id'];
  }

  // 암호화 AES256
  AES_encrypt(data, key) {
    const iv = Buffer.alloc(16, 0); // 16비트
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      process.env.AES_SECRET,
      iv,
    );
    let encryptedText = cipher.update(data, 'utf8', 'base64');
    encryptedText += cipher.final('base64');
    return encryptedText;
  }

  // 복호화 AES256
  AES_decrypt(data, key) {
    const iv = Buffer.alloc(16, 0); // 16비트
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      process.env.AES_SECRET,
      iv,
    );
    let decryptedText = decipher.update(data, 'base64', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
  }
}
