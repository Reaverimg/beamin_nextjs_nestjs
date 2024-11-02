import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FoodItemModule } from './food-item/food-item.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, FoodItemModule, OrderModule, AuthModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), JwtModule.register({ global: true })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
