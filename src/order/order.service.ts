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

  findAll(user: User) {
    return this.productModel.find({ user: user.id }).exec();
  }

  findOne(user: User, id: string) {
    return this.productModel.findOne({ user: user.id, _id: id });
  }

  update(user: User, id: string, updateOrderDto: UpdateOrderDto) {
    return this.productModel
      .findOneAndUpdate({ user: user.id, _id: id }, updateOrderDto, {
        returnDocument: 'after',
      })
      .exec();
  }

  cancel(user: User, id: string) {
    return this.productModel
      .findOneAndUpdate(
        { user: user.id, _id: id },
        { status: OrderStatus.CANCELED },
        {
          returnDocument: 'after',
        },
      )
      .exec();
  }
}
