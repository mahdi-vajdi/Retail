import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Role } from '../users/roles/roles.enum';
import { Roles } from '../users/roles/roles.decorator';
import { UserId } from '../users/decorators/userId.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.CUSTOMER)
  create(@UserId() userId: string, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(userId, createOrderDto);
  }

  @Get()
  @Roles(Role.CUSTOMER)
  findAll(@UserId() userId: string) {
    return this.orderService.findAll(userId);
  }

  @Get(':id')
  @Roles(Role.CUSTOMER)
  findOne(@UserId() userId: string, @Param('id') id: string) {
    return this.orderService.findOne(userId, +id);
  }

  @Patch(':id')
  @Roles(Role.CUSTOMER)
  update(
    @UserId() userId: string,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(userId, +id, updateOrderDto);
  }

  @Patch('cancel/:id')
  @Roles(Role.CUSTOMER)
  remove(@UserId() userId: string, @Param('id') id: string) {
    return this.orderService.cancel(userId, +id);
  }
}
