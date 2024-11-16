/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from '@prisma/client';

@Injectable()
export class FoodItemService {
  constructor(private prisma: PrismaService) { }

  // Lấy thông tin chi tiết thức ăn
  async getFoodItemById(id: number) {
    const foodItem = await this.prisma.foodItem.findUnique({
      where: { id },
      include: { Category: true },
    });

    if (!foodItem) {
      throw new NotFoundException(`Food item with id ${id} not found`);
    }

    return foodItem;
  }


  // Lấy danh sách thức ăn có phân trang và tìm kiếm theo tên
  async getFoodItems(
    page: number = 1,
    pageSize: number = 10,
    search?: string,
    categoryId?: number
  ) {
    const skip = (page - 1) * pageSize;

    const categoryIdNumber = categoryId ? Number(categoryId) : undefined;
    const where: Prisma.FoodItemWhereInput = {
      ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
      ...(categoryIdNumber ? { category_id: { equals: categoryIdNumber } } : {}),
    };

    return this.prisma.foodItem.findMany({
      where,
      skip,
      take: pageSize,
      include: { Category: true },
    });
  }

  // Lấy tất cả danh mục
  async getCategories() {
    return this.prisma.category.findMany();
  }

}
