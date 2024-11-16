/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrder(
    @Body('userId') userId: number,
    @Body('items') items: { foodItemId: number; quantity: number }[],
  ) {
    return this.orderService.createOrder(userId, items);
  }
}
