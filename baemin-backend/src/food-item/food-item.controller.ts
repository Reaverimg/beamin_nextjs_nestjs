import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FoodItemService } from './food-item.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';

@Controller('food-item')
export class FoodItemController {
  constructor(private foodItemService: FoodItemService) {}

  // Endpoint lấy danh sách thức ăn có phân trang và tìm kiếm
  @Get()
  async getFoodItems(@Query('page') page, @Query('pageSize') pageSize, @Query('search') search) {
    return this.foodItemService.getFoodItems(page, pageSize, search);
  }

  // Endpoint lấy tất cả danh mục
  @Get('categories')
  async getAllCategories() {
    return this.foodItemService.getAllCategories();
  }
}
