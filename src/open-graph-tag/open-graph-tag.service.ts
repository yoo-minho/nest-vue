import { Injectable } from '@nestjs/common';
import ogs from 'open-graph-scraper';

@Injectable()
export class OpenGraphTagService {
  async getOne(url: string) {
    let result;
    try {
      const response = await ogs({ url: convertScrapUrl(url) });
      result = response.result;
    } catch (e) {
      result = { success: false, message: e.result.error };
    }
    return result;
  }
}

function convertScrapUrl(url: string): string {
  if (url.startsWith('https://blog.naver.com/')) {
    const blogId = url.replace('https://blog.naver.com/', '');
    return `https://blog.naver.com/prologue/PrologueList.naver?blogId=${blogId}`;
  }
  return url;
}
