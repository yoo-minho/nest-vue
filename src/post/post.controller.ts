import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Prisma } from '@prisma/client';
import { LinkService } from '../link/link.service';

const numbersPipe = new ParseArrayPipe({ items: Number, separator: ',' });

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly linkService: LinkService,
  ) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const { linkId, items = [] } = createPostDto;

    if (items.length === 0) return;

    const postDtos = items.map(
      (item): Prisma.PostCreateManyInput => ({ linkId, ...item }),
    );
    const posts = this.postService.createPosts(postDtos);
    const lastPostArr = await this.postService.lastPosts([linkId]);

    if (lastPostArr.length == 0) return;

    const lastPostCreatedAt = lastPostArr[0]._max.createdAt;
    this.linkService.updateLastPostCreatedAt(linkId, lastPostCreatedAt);
    return posts;
  }

  @Get()
  findAll(
    @Query('linkIds', numbersPipe) linkIds: number[],
    @Query('page') page: number,
  ) {
    page = page || 1;
    const PAGE_PER_COUNT = 20;
    return this.postService.posts({
      where: { linkId: { in: linkIds } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_PER_COUNT,
      take: PAGE_PER_COUNT,
    });
  }

  @Get('search')
  async search(@Query('q') q: string, @Query('page') page: number) {
    if (q === '') return;
    page = page || 1;
    const PAGE_PER_COUNT = 20;
    const qArr = q
      .split('|')
      .filter((word) => !!word)
      .map((word) => ({
        title: { contains: word.trim(), mode: 'insensitive' },
      })) as Prisma.Enumerable<Prisma.PostWhereInput>;
    return await this.postService.posts({
      where: { OR: qArr },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_PER_COUNT,
      take: PAGE_PER_COUNT,
    });
  }

  @Get('last')
  async findAllLast(@Query('linkIds', numbersPipe) linkIds: number[]) {
    const lastPostArr = await this.postService.lastPosts(linkIds);
    return lastPostArr.map(({ _max, linkId }) => ({
      linkId,
      createdAt: _max.createdAt,
    }));
  }

  @Get('many')
  async findCountGroupById(@Query('linkIds', numbersPipe) linkIds: number[]) {
    const arr = await this.postService.postCountGroupByLinkId(linkIds);
    return arr.map(({ _count, linkId }) => ({ linkId, count: _count.id }));
  }

  @Get('count/date')
  async countByDate(@Query('linkIds', numbersPipe) linkIds: number[]) {
    return await this.postService.postCountByDate(linkIds);
  }
}
