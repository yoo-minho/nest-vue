import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Group } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { getToday8 } from 'src/plugin/dayjs';

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

  async group(domain: string): Promise<Group> {
    //카운트가 오늘의 값과 전체의 값을 가져와야되다보니
    //개별쿼리로 작성하는게 더 가독성이 나을 수도 있을 것 같음
    //그럼 도메인은 어떻게 짜지?
    return this.prisma.group.findUnique({
      include: {
        links: true,
        counts: { where: { date: getToday8() } },
      },
      where: {
        domain,
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
        links: true,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async groupTags() {
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
}