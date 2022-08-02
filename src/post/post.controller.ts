import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Prisma } from '@prisma/client';
import { link } from 'fs';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    const { linkId, items } = createPostDto;
    const postDtos = items.map(
      (item): Prisma.PostCreateManyInput => ({ linkId, ...item }),
    );
    return this.postService.createPosts(postDtos);
  }

  @Get()
  findAll(@Query() { linkId }) {
    return this.postService.posts({
      where: { linkId: +linkId },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post('in')
  findAllIn(@Body() { linkIds }) {
    const linkArr = linkIds.map(({ linkId }) => linkId);
    return this.postService.posts({
      where: { linkId: { in: linkArr } },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post('last')
  async findAllLast(@Body() { linkIds }) {
    const linkArr = linkIds.map(({ linkId }) => linkId);
    const lastPostArr = await this.postService.lastPosts(linkArr);
    return lastPostArr.map(({ _max, linkId }) => {
      return {
        linkId,
        createdAt: _max.createdAt,
        title: linkIds.find((v) => v.linkId === linkId).title,
      };
    });
  }
}
