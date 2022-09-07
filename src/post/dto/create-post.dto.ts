import { IsOptional, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  linkId: number;
  items: PostItemDto[];
}

class PostItemDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @MaxLength(20)
  @IsString()
  title: string;

  createdAt: string | Date;

  @MaxLength(100)
  @IsString()
  description?: string;

  @IsString()
  url: string;
}
