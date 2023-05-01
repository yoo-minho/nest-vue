import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import {
  getBeforeMonth,
  getFormatString,
  enumerateDaysFromNMonths,
} from 'src/plugin/dayjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPosts(data: Prisma.Enumerable<Prisma.PostCreateManyInput>) {
    try {
      return await this.prisma.post.createMany({ data, skipDuplicates: true });
    } catch (e) {
      throw e;
    }
  }

  async count() {
    return await this.prisma.post.count();
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      include: {
        link: true,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async lastPosts(linkArr) {
    return this.prisma.post.groupBy({
      by: ['linkId'],
      where: {
        linkId: {
          in: linkArr,
        },
      },
      _max: { createdAt: true },
      orderBy: {
        _max: {
          createdAt: 'desc',
        },
      },
    });
  }

  async postCountGroupByLinkId(linkArr) {
    return this.prisma.post.groupBy({
      _count: { id: true },
      by: ['linkId'],
      where: {
        linkId: {
          in: linkArr,
        },
        createdAt: {
          gte: getBeforeMonth(3),
        },
      },
      orderBy: [{ _count: { id: 'desc' } }, { _max: { createdAt: 'desc' } }],
    });
  }

  async postCountByDate(linkArr) {
    const posts = await this.prisma.post.findMany({
      select: {
        linkId: true,
        createdAt: true,
      },
      where: {
        linkId: {
          in: linkArr,
        },
        createdAt: {
          gte: getBeforeMonth(3),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const postCounts = {};
    posts.forEach(({ linkId, createdAt }) => {
      const day8 = getFormatString(createdAt, 'YYYY-MM-DD');
      if (!postCounts[day8]) {
        postCounts[day8] = { ['totalCount']: 0 };
      }
      postCounts[day8]['totalCount'] = postCounts[day8]['totalCount'] + 1;
    });
    const days = enumerateDaysFromNMonths(3, 'YYYY-MM-DD');
    return days.map((v) => ({ ...v, count: postCounts[v.date] }));
  }
}
