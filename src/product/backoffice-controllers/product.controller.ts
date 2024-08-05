import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services';
import { CreateProductDto, GetStatusQueryDto, UpdateProductDto } from '../types/dto';
@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async getProducts(@Query() getProductQuery: GetStatusQueryDto) {
    return this.productService.getProducts(getProductQuery);
  }

  @Get(':id')
  async getProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productService.getProduct(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateProduct: UpdateProductDto,) {
    return this.productService.updateProduct(id,updateProduct);
  }
}
