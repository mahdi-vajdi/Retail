import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserId } from '../users/decorators/userId.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderStatus } from './schemas/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private productModel: Model<Order>) {}

  create(@UserId() userId: string, createOrderDto: CreateOrderDto) {
    return this.productModel.create(createOrderDto);
  }

  async findAll(@UserId() userId: string) {
    return await this.productModel.find({ user: userId }).exec();
  }

  async findOne(@UserId() userId: string, id: number) {
    return await this.productModel.findOne({ user: userId, _id: id });
  }

  async update(
    @UserId() userId: string,
    id: number,
    updateOrderDto: UpdateOrderDto,
  ) {
    return await this.productModel.findOneAndUpdate(
      { user: userId, _id: id },
      updateOrderDto,
    );
  }

  async cancel(@UserId() userId: string, id: number) {
    return await this.productModel.findOne(
      { user: userId, _id: id },
      { status: OrderStatus.CANCELED },
    );
  }
}
