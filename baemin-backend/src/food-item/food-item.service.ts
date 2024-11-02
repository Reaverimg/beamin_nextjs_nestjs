import { Injectable } from '@nestjs/common';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodItemService {
  constructor(
    private prisma: PrismaService
  ) { }

  // Lấy danh sách thức ăn có phân trang và tìm kiếm theo tên
  async getFoodItems(page: number = 1, pageSize: number = 9, search: string) {
    const skip = (page - 1) * pageSize;
    const where = search ? { name: { contains: search } } : {}
    return this.prisma.foodItem.findMany({
      where,
      skip,
      take: Number(pageSize),
      include: {
        Category: true
      },
    });
  }

  // Lấy tất cả danh mục
  async getAllCategories() {
    return this.prisma.category.findMany();
  }
}
