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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseObjectId } from 'src/common/parseObjectId.pipe';
import { Roles } from 'src/users/roles/roles.decorator';
import { UserRoles } from 'src/users/roles/roles.enum';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(UserRoles.MANAGER, UserRoles.ADMIN)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectId) id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.MANAGER, UserRoles.ADMIN)
  update(
    @Param('id', ParseObjectId) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(UserRoles.MANAGER, UserRoles.ADMIN)
  remove(@Param('id', ParseObjectId) id: string) {
    return this.productService.remove(id);
  }
}
