import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/welcome')
  async getWelcome(): Promise<any> {
    return 'on';
  }
}
