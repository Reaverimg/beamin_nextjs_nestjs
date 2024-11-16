/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async createOrder(userId: number, items: { foodItemId: number; quantity: number }[]) {
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const foodItem = await this.prisma.foodItem.findUnique({
        where: { id: item.foodItemId },
      });

      if (!foodItem || foodItem.stock < item.quantity) {
        throw new Error(`Món ăn ${foodItem?.name || 'n/a'} không đủ tồn kho`);
      }

      totalAmount += Number(foodItem.price) * item.quantity;

      orderItems.push({
        foodItemId: item.foodItemId,
        quantity: item.quantity,
        price: foodItem.price,
      });

      await this.prisma.foodItem.update({
        where: { id: item.foodItemId },
        data: { stock: foodItem.stock - item.quantity },
      });
    }

    return this.prisma.order.create({
      data: {
        user_id: userId,
        total_amount: totalAmount,
        status: 'Pending',
        OrderItem: { create: orderItems },
      },
      include: { OrderItem: true },
    });
  }

}
