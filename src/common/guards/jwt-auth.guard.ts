import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: boolean | null, user, info: Error) {
    if (err || !user) {
      const { name, message, stack } = info;
      console.log({ name, message, stack });
      let _name = name,
        _message;
      if (name === 'JsonWebTokenError') {
        _message = '유효하지 않은 토큰입니다.';
      } else if (name === 'TokenExpiredError' && message === 'jwt expired') {
        _message = '만료된 토큰입니다.';
      } else if (name === 'Error' && message === 'No auth token') {
        _name = 'NoAuthTokenError';
        _message = '토큰이 존재하지 않습니다.';
      }
      throw new UnauthorizedException({ name: _name, message: _message });
    }
    return user;
  }
}
