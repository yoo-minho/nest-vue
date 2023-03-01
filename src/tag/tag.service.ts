import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tag.findMany({
      include: {
        _count: true,
      },
      orderBy: {
        groups: { _count: 'desc' },
      },
    });
  }

  async upsert(tags: string[]) {
    try {
      const upsertTagsResponse = await Promise.allSettled(
        tags.map((tag) =>
          this.prisma.tag.upsert({
            where: { name: tag },
            create: { name: tag },
            update: {},
          }),
        ),
      );
      return upsertTagsResponse.map((t) =>
        t.status === 'fulfilled' ? t.value : { id: -1 },
      );
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
