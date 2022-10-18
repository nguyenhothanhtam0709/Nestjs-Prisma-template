import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@commons/const/paginate';
import { PaginateResult } from '@commons/DTO/paginate';
import { ERROR_MESSAGE } from '@commons/enums/errorMessage';
import { mapPrismaError } from '@commons/utils/error';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './DTO/createCategory.dto';
import { QueryCategoryDto } from './DTO/queryCategory.dto';
import { UpdateCategoryDto } from './DTO/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data,
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
      const category = await this.prisma.category.update({
        where: { id },
        data,
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
