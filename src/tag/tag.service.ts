import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: { groups: true },
        },
      },
      orderBy: {
        groups: { _count: 'desc' },
      },
    });
  }

  upsert(tags: string[]) {
    try {
      return Promise.allSettled(
        tags.map((tag) =>
          this.prisma.tag.upsert({
            where: { name: tag },
            create: { name: tag },
            update: {},
          }),
        ),
      );
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
