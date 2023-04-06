import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.categoryModel.create(createCategoryDto);
    return createdCategory;
  }

  async findAll() {
    const foundCategories = await this.categoryModel.find().exec();
    if (!foundCategories.length)
      throw new NotFoundException('Could not find any categories');
    return foundCategories;
  }

  findOne(id: string) {
    const foundCategory = this.categoryModel.findById(id).exec();
    if (!foundCategory)
      throw new NotFoundException(
        `Could not find any category mathcing the id: ${id}`,
      );
    return foundCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { returnDocument: 'after' },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
