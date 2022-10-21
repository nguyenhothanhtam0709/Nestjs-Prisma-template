import { DynamoDBModule } from '@modules/_shared/dynamodb/dynamodb.module';
import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [DynamoDBModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
