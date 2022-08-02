import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
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
}
