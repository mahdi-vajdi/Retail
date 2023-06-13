import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Role } from '../users/roles/roles.enum';
import { Roles } from '../users/roles/roles.decorator';
import { User } from '../users/schemas/user.schema';
import { UserDec } from '../users/decorators/userId.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.CUSTOMER)
  create(@UserDec() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(user, createOrderDto);
  }

  @Get()
  @Roles(Role.CUSTOMER)
  async findAll(@UserDec() user: User) {
    const foundOrders = await this.orderService.findAll(user);
    if (!foundOrders)
      throw new NotFoundException('Could not find any orders for the user');
    return foundOrders;
  }

  @Get(':id')
  @Roles(Role.CUSTOMER)
  findOne(@UserDec() user: User, @Param('id') id: string) {
    const foundOrder = this.orderService.findOne(user, +id);
    if (!foundOrder)
      throw new NotFoundException(
        `Could not find an order with the id ${id} for the user`,
      );
    return foundOrder;
  }

  @Patch(':id')
  @Roles(Role.CUSTOMER)
  update(
    @UserDec() user: User,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const updatedOrder = this.orderService.update(user, +id, updateOrderDto);
    if (!updatedOrder)
      throw new NotFoundException(
        `Could not find an order with the id ${id} for the user`,
      );
    return updatedOrder;
  }

  @Patch('cancel/:id')
  @Roles(Role.CUSTOMER)
  remove(@UserDec() user: User, @Param('id') id: string) {
    const removedOrder = this.orderService.cancel(user, +id);
    if (!removedOrder)
      throw new NotFoundException(
        `Could not find an order with the id ${id} for the user`,
      );
    return removedOrder;
  }
}
