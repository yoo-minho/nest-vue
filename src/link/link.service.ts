import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Prisma, Link } from '@prisma/client';
import { LinkItemDto } from 'src/group/dto/link-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

  async createLink(data: Prisma.LinkCreateInput): Promise<Link> {
    try {
      return await this.prisma.link.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(e);
        }
      }
      throw new ForbiddenException(e);
    }
  }

  async links(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LinkWhereUniqueInput;
    where?: Prisma.LinkWhereInput;
    orderBy?: Prisma.LinkOrderByWithRelationInput;
  }): Promise<Link[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.link.findMany({
      include: {
        groups: {
          select: { group: { select: { title: true } } },
          where: { group: { NOT: { lastPostCreatedAt: null } } },
          orderBy: { group: { lastPostCreatedAt: 'desc' } },
          take: 3,
        },
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(id: number) {
    try {
      return await this.prisma.link.update({
        data: { scrapAt: new Date() },
        where: { id },
      });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async upsert(links: LinkItemDto[]) {
    try {
      const upsertLinksResponse = await Promise.allSettled(
        links.map((link) =>
          this.prisma.link.upsert({
            where: { url: link.url },
            create: link,
            update: link,
          }),
        ),
      );
      return upsertLinksResponse.map((l) =>
        l.status === 'fulfilled' ? l.value : { id: -1 },
      );
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async updateScrapAt(id: number) {
    return await this.prisma.link.update({
      data: {
        scrapAt: new Date(),
      },
      where: { id },
    });
  }

  async updateLastPostCreatedAt(id: number, lastPostCreatedAt: Date) {
    return await this.prisma.link.update({
      data: {
        lastPostCreatedAt,
      },
      where: { id },
    });
  }

  async count() {
    return await this.prisma.link.count();
  }

  async countByPlatform() {
    return await this.prisma.link.groupBy({
      by: ['type'],
      _count: true,
      orderBy: [{ _count: { type: 'desc' } }],
    });
  }
}
