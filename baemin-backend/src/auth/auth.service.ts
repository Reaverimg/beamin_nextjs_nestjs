/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

  // Đăng ký 
  async signUp(email: string, password: string, name: string, phone: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
      },
    });
    return user;
  }

  // Đăng nhập
  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    const payload = { userId: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload, {
      algorithm: 'HS256',
      secret: 'khaiphu',
      expiresIn: '24h',
    });
    return { accessToken: token };
  }
}
