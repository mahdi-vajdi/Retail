import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.productModel.create(createProductDto);
    return createdProduct;
  }

  async findAll() {
    const foundProducts = await this.productModel.find().exec();
    if (!foundProducts.length)
      throw new NotFoundException('Could not find any products');
    return foundProducts;
  }

  async findOne(id: string) {
    const foundProduct = await this.productModel.findById(id).exec();
    if (!foundProduct)
      throw new NotFoundException(
        `Could not find any product mathcing the id: ${id}`,
      );
    return foundProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { returnDocument: 'after' },
    );
    if (!updatedProduct)
      throw new NotFoundException(
        `Could not find any product mathcing the id: ${id}`,
      );
    return updatedProduct;
  }

  async remove(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct)
      throw new NotFoundException(
        `Could not find any product mathcing the id: ${id}`,
      );
    return deletedProduct;
  }
}
