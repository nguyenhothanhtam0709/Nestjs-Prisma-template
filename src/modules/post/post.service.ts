import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@commons/const/paginate';
import { PaginateResult } from '@commons/DTO/paginate';
import { ERROR_MESSAGE } from '@commons/enums/errorMessage';
import { PrismaError } from '@commons/enums/prismaError';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './DTO/createPost.dto';
import { QueryPostDto } from './DTO/queryPost.dto';
import { UpdatePostDto } from './DTO/updatePost.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreatePostDto) {
    return this.prisma.post.create({
      data,
    });
  }

  async getById(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      throw new NotFoundException(
        ERROR_MESSAGE.NOT_EXIST.replace('{0}', 'Post'),
      );
    }

    return post;
  }

  async get(input: QueryPostDto) {
    const {
      pageSize = DEFAULT_PAGE_SIZE,
      pageIndex = DEFAULT_PAGE_INDEX,
      title,
    } = input;

    const findQuery: Record<string, any> = {};
    if (title) {
      findQuery.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    const posts = await this.prisma.post.findMany({
      where: findQuery,
      skip: pageSize * (pageIndex - 1),
      take: pageSize,
    });
    const totalCount = await this.prisma.post.count();

    return new PaginateResult(posts, totalCount, pageSize, pageIndex);
  }

  async update(id: number, data: UpdatePostDto) {
    try {
      const post = await this.prisma.post.update({ where: { id }, data });
      return post;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code == PrismaError.RecordDoesNotExist
      ) {
        throw new BadRequestException(
          ERROR_MESSAGE.NOT_EXIST.replace('{0}', 'Post'),
        );
      }

      throw error;
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.post.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code == PrismaError.RecordDoesNotExist
      ) {
        throw new BadRequestException(
          ERROR_MESSAGE.NOT_EXIST.replace('{0}', 'Post'),
        );
      }

      throw error;
    }
  }
}
