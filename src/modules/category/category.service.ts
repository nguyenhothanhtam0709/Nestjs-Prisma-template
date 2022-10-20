import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@commons/const/paginate';
import { PaginateResult } from '@commons/DTO/paginate';
import { ERROR_MESSAGE } from '@commons/enums/errorMessage';
import { mapPrismaError } from '@commons/utils/error';
import { PrismaService } from '@modules/_shared/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './DTO/createCategory.dto';
import { QueryCategoryDto } from './DTO/queryCategory.dto';
import { UpdateCategoryDto } from './DTO/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data,
      select: {
        id: true,
        name: true,
        superCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async get(input: QueryCategoryDto) {
    const {
      name,
      pageSize = DEFAULT_PAGE_SIZE,
      pageIndex = DEFAULT_PAGE_INDEX,
    } = input;

    const query: Record<string, any> = {};
    if (name) {
      query.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    const categories = await this.prisma.category.findMany({
      where: query,
      select: {
        id: true,
        name: true,
      },
      skip: pageSize * (pageIndex - 1),
      take: pageSize,
    });
    const totalCount = await this.prisma.category.count({ where: query });

    return new PaginateResult(categories, totalCount, pageSize, pageIndex);
  }

  async getById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        superCategory: {
          select: {
            id: true,
            name: true,
          },
        },
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(
        ERROR_MESSAGE.NOT_EXIST.replace('{0}', 'Category'),
      );
    }

    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    try {
      if (data?.superCategoryId) {
        const superCategory = await this.prisma.category.findUnique({
          where: {
            id: data.superCategoryId,
          },
        });
        if (!superCategory) {
          throw new BadRequestException(
            ERROR_MESSAGE.NOT_EXIST.replace(
              '{0}',
              `Category ${data.superCategoryId}`,
            ),
          );
        }
      }

      const category = await this.prisma.category.update({
        where: { id },
        data: data,
        select: {
          id: true,
          name: true,
          superCategory: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return category;
    } catch (error) {
      throw mapPrismaError(error, 'Category');
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw mapPrismaError(error, 'Category');
    }
  }
}
