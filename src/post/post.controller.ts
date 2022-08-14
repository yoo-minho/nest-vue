import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Prisma } from '@prisma/client';

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

  @Post()
  findAll(@Body() { linkIds }) {
    const linkArr = linkIds.map(({ linkId }) => linkId);
    return this.postService.posts({
      where: { linkId: { in: linkArr } },
      orderBy: { createdAt: 'desc' },
      take: 100,
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

  @Post('count/date')
  async countByDate(@Body() { linkIds }) {
    const linkArr = linkIds.map(({ linkId }) => linkId);
    return await this.postService.postCountByDate(linkArr);
  }
}
