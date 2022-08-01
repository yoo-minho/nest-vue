import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreatePostDto {
  linkId: number;
  items: {
    id?: number;
    title: string;
    createdAt: string | Date;
    description?: string;
    url: string;
  }[];
}
