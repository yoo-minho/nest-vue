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
}
