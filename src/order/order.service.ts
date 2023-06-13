import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderStatus } from './schemas/order.schema';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private productModel: Model<Order>) {}

  create(user: User, createOrderDto: CreateOrderDto) {
    const order = new this.productModel(createOrderDto);
    order.user = user;
    order.dateOrderd = new Date();
    return order.save();
  }

  async findAll(user: User) {
    return await this.productModel.find({ user: user.id }).exec();
  }

  async findOne(user: User, id: number) {
    return await this.productModel.findOne({ user: user.id, _id: id });
  }

  async update(user: User, id: number, updateOrderDto: UpdateOrderDto) {
    return await this.productModel.findOneAndUpdate(
      { user: user.id, _id: id },
      updateOrderDto,
    );
  }

  async cancel(user: User, id: number) {
    return await this.productModel.findOne(
      { user: user.id, _id: id },
      { status: OrderStatus.CANCELED },
    );
  }
}
