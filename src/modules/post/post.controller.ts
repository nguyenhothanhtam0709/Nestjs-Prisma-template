import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './DTO/createPost.dto';
import { QueryPostDto } from './DTO/queryPost.dto';
import { UpdatePostDto } from './DTO/updatePost.dto';
import { PostService } from './post.service';

@Controller('/posts')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() body: CreatePostDto) {
    return this.postService.create(body);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getById(id);
  }

  @Get()
  async get(@Query() query: QueryPostDto) {
    return this.postService.get(query);
  }

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
  ) {
    return this.postService.update(id, data);
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
