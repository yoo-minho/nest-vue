import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async isUpdatableViewsByGroupDomain(
    domain: string,
    ip: string,
  ): Promise<boolean> {
    const UPDATE_CYCLE_SEC = 60 * 10; //10min
    const visitGroup = (await this.getVisitGroups()) || {};
    if (
      visitGroup[domain] &&
      this.getSecondfromNow(visitGroup[domain][ip]) < UPDATE_CYCLE_SEC
    ) {
      return false;
    }
    await this.setVisitGroups(domain, ip);
    return true;
  }

  private getVisitGroups() {
    return this.cacheManager.get('visit-group');
  }

  private async setVisitGroups(domain: string, ip: string) {
    let visitGroup = ((await this.getVisitGroups()) || {}) as object;
    if (visitGroup[domain]) {
      visitGroup[domain][ip] = new Date();
    } else {
      visitGroup = { ...visitGroup, [domain]: { [ip]: new Date() } };
    }
    await this.cacheManager.set('visit-group', visitGroup, { ttl: 0 });
  }

  private getSecondfromNow(date: Date): number {
    if (!date) return Infinity;
    return Math.ceil((new Date().getTime() - date.getTime()) / 1000);
  }
}
