import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Group } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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
    return this.prisma.group.findUnique({
      include: {
        links: true,
        counts: true,
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

  async upsertCount(groupId: number) {
    try {
      return await this.prisma.count.upsert({
        where: { groupId, date: new Date().toDateString() },
        create: { date: new Date().toDateString(), count: 0 },
        update: { count: 1 },
      });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }
}
