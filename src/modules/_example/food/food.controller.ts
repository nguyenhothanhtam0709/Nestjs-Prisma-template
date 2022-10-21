import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { CreateFoodDto } from './DTO/createFood.dto';
import { GetFoodDto } from './DTO/getFood.dto';
import { QueryFoodDto } from './DTO/queryFood.dto';
import { UpdateFoodDto } from './DTO/updateFood.dto';
import { FoodService } from './food.service';

@ApiTags('Food')
@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() body: CreateFoodDto) {
    return this.foodService.create(body);
  }

  @Get('key')
  getByKey(@Query() query: GetFoodDto) {
    return this.foodService.getByKey(query);
  }

  @Get('query')
  get(@Query() query: QueryFoodDto) {
    return this.foodService.get(query);
  }

  @Delete('key')
  deleteByKey(@Query() query: GetFoodDto) {
    return this.foodService.delete(query);
  }

  @Put('key')
  updateByKey(@Query() query: GetFoodDto, @Body() body: UpdateFoodDto) {
    return this.foodService.update(query, body);
  }
}
