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
import { UserRoles } from 'src/users/roles/roles.enum';
import { Roles } from 'src/users/roles/roles.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(UserRoles.MANAGER, UserRoles.ADMIN)
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
  @Roles(UserRoles.MANAGER, UserRoles.ADMIN)
  update(
    @Param('id', ParseObjectId) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(UserRoles.MANAGER, UserRoles.ADMIN)
  remove(@Param('id', ParseObjectId) id: string) {
    return this.categoryService.remove(id);
  }
}
