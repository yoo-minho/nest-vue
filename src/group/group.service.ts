import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Prisma, Group, Tag } from '@prisma/client';
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

  async findAll() {
    try {
      return await this.prisma.group.findMany({
        select: {
          links: true,
          tags: true,
          counts: true,
          creater: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
