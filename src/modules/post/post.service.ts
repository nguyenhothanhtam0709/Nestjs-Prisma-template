import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@commons/const/paginate';
import { PaginateResult } from '@commons/DTO/paginate';
import { ERROR_MESSAGE } from '@commons/enums/errorMessage';
import { mapPrismaError } from '@commons/utils/error';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_shared/prisma/prisma.service';
import { POST_JOIN_AND_SELECT } from './const/post';
import { CreatePostDto } from './DTO/createPost.dto';
import { QueryPostDto } from './DTO/queryPost.dto';
import { UpdatePostDto } from './DTO/updatePost.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    try {
      const { medias, categories, ...postData } = data;

      const createdData: any = medias?.length
        ? {
            ...postData,
            medias: {
              create: medias,
            },
          }
        : postData;
      createdData.categories = {
        connect: categories.map((i) => ({ id: i })),
      };

      const post = await this.prisma.post.create({
        data: createdData,
        include: POST_JOIN_AND_SELECT,
      });
      return post;
    } catch (error) {
      throw mapPrismaError(error, 'Category');
    }
  }

  async getById(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: POST_JOIN_AND_SELECT,
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
      categories,
    } = input;

    const findQuery: Record<string, any> = {};
    if (title) {
      findQuery.title = {
        contains: title,
        mode: 'insensitive',
      };
    }
    if (categories?.length) {
      findQuery.categories = {
        some: {
          name: {
            in: categories,
          },
        },
      };
    }

    const posts = await this.prisma.post.findMany({
      where: findQuery,
      include: POST_JOIN_AND_SELECT,
      skip: pageSize * (pageIndex - 1),
      take: pageSize,
    });
    const totalCount = await this.prisma.post.count({ where: findQuery });

    return new PaginateResult(posts, totalCount, pageSize, pageIndex);
  }

  async update(id: number, data: UpdatePostDto) {
    try {
      const { medias, categories, ...postData } = data;

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

      const categoriesQuery = {
        set: categories.map((i) => ({
          id: i,
        })),
      };

      const updatedData: Record<string, any> = {
        ...postData,
        medias: mediasQuery,
        categories: categoriesQuery,
      };

      const post = await this.prisma.post.update({
        where: { id },
        data: updatedData,
        include: POST_JOIN_AND_SELECT,
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
