import { Controller, Get, Param } from '@nestjs/common';
import { resolve, join } from 'path';
import { readFileSync } from 'fs';
import { parse, HTMLElement } from 'node-html-parser';
import { GroupService } from './group/group.service';

const root = parse(
  readFileSync(
    resolve(join(__dirname, '..'), 'client/dist/index.html'),
    'utf-8',
  ),
);

@Controller()
export class AppController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getPage(): Promise<any> {
    const meta = new useMeta(root);
    meta.setTitle('팀로그(teamlog) - 팀으로 글쓰기를 시작할때 최고의 선택');
    meta.setDescription(
      '티스토리, 미디엄, 브런치, 벨로그, 네이버블로그 상관없이 팀 블로그를 만들 수 있어요!',
    );
    meta.setUrl('https://teamlog.team/');
    meta.setImage('https://teamlog.team/og_image_white.png');
    return root.toString();
  }

  @Get('/@:domain')
  async getTeamDetailPage(@Param('domain') domain: string): Promise<any> {
    const groupData = await this.groupService.groupByDomain(domain);
    const meta = new useMeta(root);
    meta.setTitle(`${groupData.title} - teamlog`);
    meta.setDescription(groupData.description);
    meta.setUrl(`https://teamlog.team/@${domain}`);
    meta.setImage('https://teamlog.team/og_image_white.png');
    return root.toString();
  }

  @Get('/error')
  async getErrorPage(): Promise<any> {
    return root.toString();
  }

  @Get('/oauth')
  async getOAuthPage(): Promise<any> {
    return root.toString();
  }

  @Get('/my')
  async getMyPage(): Promise<any> {
    return root.toString();
  }
}

class useMeta {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  setTitle(contents: string) {
    this.root.querySelector('title').innerHTML = contents;
    this.setMetaProperty('og:title', contents);
    this.setMetaProperty('og:site_name', contents);
    this.setMetaName('twitter:title', contents);
  }

  setDescription(contents: string) {
    this.setMetaName('description', contents);
    this.setMetaProperty('og:description', contents);
    this.setMetaName('twitter:description', contents);
  }

  setUrl(contents: string) {
    this.setMetaName('url', contents);
    this.setMetaProperty('og:url', contents);
    this.setMetaName('twitter:url', contents);
    this.root
      .querySelector(`link[rel=canonical]`)
      .setAttribute('href', contents);
  }

  setImage(contents: string) {
    this.setMetaProperty('og:image', contents);
    this.setMetaName('twitter:image', contents);
  }

  setMetaName(sizzle: string, contents: string) {
    this.root
      .querySelector(`meta[name=${sizzle}]`)
      .setAttribute('content', contents);
  }

  setMetaProperty(sizzle: string, contents: string) {
    this.root
      .querySelector(`meta[property=${sizzle}]`)
      .setAttribute('content', contents);
  }
}
