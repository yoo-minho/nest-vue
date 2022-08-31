import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

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
}
