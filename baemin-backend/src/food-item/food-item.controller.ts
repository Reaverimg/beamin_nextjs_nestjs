/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { FoodItemService } from './food-item.service';

@Controller('food-item')
export class FoodItemController {
  constructor(private foodItemService: FoodItemService) { }

  // Endpoint lấy danh sách thức ăn có phân trang và tìm kiếm
  @Get()
  async getFoodItems(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: number,
  ) {
    return this.foodItemService.getFoodItems(Number(page), Number(pageSize), search, categoryId);
  }

  // Endpoint lấy tất cả danh mục
  @Get('categories')
  async getCategories() {
    return this.foodItemService.getCategories();
  }

  // Endpoint lấy chi tiết món ăn theo id
  @Get(':id')
  async getFoodItemById(@Param('id') id: string) {
    return this.foodItemService.getFoodItemById(Number(id)); 
  }
}
