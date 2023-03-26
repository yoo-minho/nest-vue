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

const numbersPipe = new ParseArrayPipe({
  items: Number,
  separator: ',',
  optional: true,
});
const PAGE_PER_COUNT = 10;

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
    const posts = await this.postService.createPosts(postDtos);
    const lastPostArr = await this.postService.lastPosts([linkId]);

    if (lastPostArr.length == 0) return posts;

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
    return this.postService.posts({
      where: { linkId: { in: linkIds } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_PER_COUNT,
      take: PAGE_PER_COUNT,
    });
  }

  @Get('search')
  async search(
    @Query('q') q: string,
    @Query('tag') tag: string,
    @Query('page') page: number,
    @Query('linkIds', numbersPipe) linkIds?: number[],
  ) {
    page = page || 1;
    const createOrJson = (
      q: string,
    ): Prisma.Enumerable<Prisma.PostWhereInput> =>
      q
        .split('|')
        .filter((word) => !!word)
        .map((word) => ({
          title: { contains: word.trim(), mode: 'insensitive' },
        }));
    return await this.postService.posts({
      where: {
        AND: [
          { linkId: { in: linkIds } },
          { OR: createOrJson(q) },
          { OR: createOrJson(tag) },
        ],
      },
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
