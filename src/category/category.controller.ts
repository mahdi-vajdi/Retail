import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ParseObjectId } from 'src/common/parseObjectId.pipe';
import { Role } from 'src/users/roles/roles.enum';
import { Role } from 'src/users/roles/roles.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Role(Role.MANAGER, Role.ADMIN)
  @UsePipes(ValidationPipe)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectId) id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Role(Role.MANAGER, Role.ADMIN)
  update(
    @Param('id', ParseObjectId) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Role(Role.MANAGER, Role.ADMIN)
  remove(@Param('id', ParseObjectId) id: string) {
    return this.categoryService.remove(id);
  }
}
