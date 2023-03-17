import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Group, Link, Views, Tag } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { getToday8 } from 'src/plugin/dayjs';

type GroupResponseDto = Group & {
  tags: { tag: Tag }[];
  links: { link: Link }[];
  counts: Views[];
  dailyViews?: number;
};

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(data: Prisma.GroupCreateInput): Promise<Group> {
    try {
      return await this.prisma.group.create({ data });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async updateGroup(
    groupId: number,
    data: Prisma.GroupUpdateInput,
  ): Promise<Group> {
    try {
      return await this.prisma.group.update({
        where: { id: groupId },
        data: data,
      });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async groupByDomain(domain: string): Promise<GroupResponseDto> {
    return this.prisma.group.findUnique({
      include: {
        tags: { select: { tag: true } },
        links: {
          select: { link: true },
          orderBy: { link: { lastPostCreatedAt: 'desc' } },
        },
        counts: { where: { date: getToday8() } },
      },
      where: {
        domain,
      },
    });
  }

  async groupById(id: number): Promise<GroupResponseDto> {
    return this.prisma.group.findUnique({
      include: {
        tags: { select: { tag: true } },
        links: {
          select: { link: true },
          orderBy: { link: { lastPostCreatedAt: 'desc' } },
        },
        counts: { where: { date: getToday8() } },
      },
      where: {
        id,
      },
    });
  }

  async groups(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GroupWhereUniqueInput;
    where?: Prisma.GroupWhereInput;
    orderBy?: Prisma.GroupOrderByWithRelationInput;
  }): Promise<Group[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.group.findMany({
      include: {
        links: {
          select: { link: true },
          orderBy: { link: { lastPostCreatedAt: 'desc' } },
        },
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async groupsByLinkId(links) {
    return await this.prisma.group.findMany({
      select: {
        id: true,
        lastPostCreatedAt: true,
        links: true,
      },
      distinct: ['id', 'lastPostCreatedAt'],
      where: {
        links: {
          some: { OR: links },
        },
      },
    });
  }

  async count() {
    return await this.prisma.group.count({
      where: {
        published: true,
      },
    });
  }

  async updateTotalViews(groupDomain: string) {
    const date = getToday8();
    try {
      const { _sum } = await this.prisma.views.aggregate({
        _sum: { count: true },
        where: {
          groupDomain,
          date: { lt: date },
        },
      });
      await this.prisma.group.update({
        where: { domain: groupDomain },
        data: { totalViews: _sum.count || 0 },
      });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async upsertDailyViews(groupDomain: string) {
    const date = getToday8();
    try {
      const { count = 1 } =
        (await this.prisma.views.findUnique({
          where: { groupDomain_date: { groupDomain, date } },
        })) || {};
      return await this.prisma.views.upsert({
        where: { groupDomain_date: { groupDomain, date } },
        create: { count: 1, date, Group: { connect: { domain: groupDomain } } },
        update: { count: count + 1 },
      });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async updateLastPostCreateAt(groupDomain: string, lastPostCreatedAt: Date) {
    try {
      await this.prisma.group.update({
        where: { domain: groupDomain },
        data: { lastPostCreatedAt },
      });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async updateLastPostCreatedAt(groupId: number) {
    try {
      const res: { max: Date }[] = await this.prisma.$queryRaw`
         SELECT MAX("Link"."lastPostCreatedAt") FROM "LinksOnGroups"
            INNER JOIN "Link" ON "LinksOnGroups"."linkId" = "Link"."id"
            WHERE "groupId" = ${groupId}
      `;
      await this.prisma.group.update({
        where: { id: groupId },
        data: { lastPostCreatedAt: res[0].max },
      });
      return { lastPostCreatedAt: res[0].max };
    } catch (e) {
      throw Error(e);
    }
  }
}
``;
