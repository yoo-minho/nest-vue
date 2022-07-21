import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import parse from 'rss-to-json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/xxx')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/welcome')
  async getWelcome(): Promise<any> {
    return await parse('https://rss.blog.naver.com/dellose.xml', {});
  }
}
