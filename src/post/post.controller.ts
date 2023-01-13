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
import { GroupService } from '../group/group.service';

const numbersPipe = new ParseArrayPipe({ items: Number, separator: ',' });

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly groupService: GroupService,
  ) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    const { linkId, items = [] } = createPostDto;
    if (items.length === 0) return;
    const postDtos = items.map(
      (item): Prisma.PostCreateManyInput => ({ linkId, ...item }),
    );
    return this.postService.createPosts(postDtos);
  }

  @Get()
  findAll(@Query('linkIds', numbersPipe) linkIds: number[]) {
    return this.postService.posts({
      where: { linkId: { in: linkIds } },
      orderBy: { createdAt: 'desc' },
      take: 20,
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

  @Get('count/date')
  async countByDate(@Query('linkIds', numbersPipe) linkIds: number[]) {
    return await this.postService.postCountByDate(linkIds);
  }
}
