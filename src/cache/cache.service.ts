import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Link } from '@prisma/client';

type LinkWrap = { link: Link };

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getGroupLinks(): Promise<LinkWrap[]> {
    return this.cacheManager.get('group-links');
  }

  setGroupLinks(data: LinkWrap[]) {
    this.cacheManager.set('group-links', data, { ttl: 0 });
  }

  async isUpdatableViewsByGroupDomain(domain: string): Promise<boolean> {
    const visitGroup = (await this.getVisitGroups()) || {};
    console.log(this.getSecondfromNow(visitGroup[domain]));
    if (this.getSecondfromNow(visitGroup[domain]) < 30) {
      return false;
    }
    await this.setVisitGroups(domain);
    return true;
  }

  private getVisitGroups() {
    return this.cacheManager.get('visit-group');
  }

  private async setVisitGroups(domain: string) {
    const visitGroup = (await this.getVisitGroups()) || {};
    visitGroup[domain] = new Date();
    await this.cacheManager.set('visit-group', visitGroup, { ttl: 0 });
  }

  private getSecondfromNow(date: Date): number {
    if (!date) return Infinity;
    return Math.ceil((new Date().getTime() - date.getTime()) / 1000);
  }
}
