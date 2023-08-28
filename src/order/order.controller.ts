import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../users/schemas/user.schema';
import { UserDec } from '../users/decorators/userId.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@UserDec() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(user, createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@UserDec() user: User) {
    const foundOrders = await this.orderService.findAll(user);
    if (!foundOrders || !foundOrders.length)
      throw new NotFoundException('Could not find any orders for the user');
    return foundOrders;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@UserDec() user: User, @Param('id') id: string) {
    const foundOrder = await this.orderService.findOne(user, id);
    if (!foundOrder)
      throw new NotFoundException(
        `Could not find an order with the id ${id} for the user`,
      );
    return foundOrder;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @UserDec() user: User,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const updatedOrder = await this.orderService.update(
      user,
      id,
      updateOrderDto,
    );
    if (!updatedOrder)
      throw new NotFoundException(
        `Could not find an order with the id ${id} for the user`,
      );
    return updatedOrder;
  }

  @Patch('cancel/:id')
  @UseGuards(JwtAuthGuard)
  async remove(@UserDec() user: User, @Param('id') id: string) {
    const removedOrder = await this.orderService.cancel(user, id);
    if (!removedOrder)
      throw new NotFoundException(
        `Could not find an order with th id ${id} for the user`,
      );
    return removedOrder;
  }
}
