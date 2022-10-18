import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@commons/const/paginate';
import { PaginateResult } from '@commons/DTO/paginate';
import { ERROR_MESSAGE } from '@commons/enums/errorMessage';
import { PrismaError } from '@commons/enums/prismaError';
import { mapPrismaError } from '@commons/utils/error';
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
    const { medias, ...postData } = data;

    const createdData = medias?.length
      ? {
          ...postData,
          medias: {
            create: medias,
          },
        }
      : postData;

    return this.prisma.post.create({
      data: createdData,
      include: {
        medias: true,
      },
    });
  }

  async getById(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        medias: true,
      },
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
      include: {
        medias: true,
      },
      skip: pageSize * (pageIndex - 1),
      take: pageSize,
    });
    const totalCount = await this.prisma.post.count({ where: findQuery });

    return new PaginateResult(posts, totalCount, pageSize, pageIndex);
  }

  async update(id: number, data: UpdatePostDto) {
    try {
      const { medias, ...postData } = data;

      const mediasQuery: Record<string, any> = {};
      if (medias?.length) {
        const ids = medias.map((i) => i?.id).filter((i) => i);
        const createPostData = medias.filter((i) => !i?.id);
        const updatePostData = medias.filter((i) => i?.id);

        if (ids?.length) {
          mediasQuery.deleteMany = {
            id: {
              not: {
                in: ids,
              },
            },
          };
        }

        if (createPostData?.length) {
          mediasQuery.create = createPostData;
        }

        if (updatePostData?.length) {
          mediasQuery.update = updatePostData;
        }
      } else {
        mediasQuery.deleteMany = {};
      }

      const updatedData: Record<string, any> = {
        ...postData,
        medias: mediasQuery,
      };

      const post = await this.prisma.post.update({
        where: { id },
        data: updatedData,
        include: {
          medias: true,
        },
      });
      return post;
    } catch (error) {
      throw mapPrismaError(error, 'Post');
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      throw mapPrismaError(error, 'Post');
    }
  }
}
