import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, UnauthorizedException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) { }

  // @UseGuards(AuthGuard('jwt'))
  @Post('/create-order')
  async createOrder(@Headers('authorization') authHeader: string, @Body('items') items) {
    if (!authHeader) {
      throw new UnauthorizedException('Token không được cung cấp');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, 'khaiphu') as jwt.JwtPayload;
      const userId = decoded.id;

      return this.orderService.createOrder(userId, items);
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }
}
