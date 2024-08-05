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
import {
  CreateCategoryDto,
  GetCategoriesQueryDto,
  UpdateCategoryDto,
} from '../types/dto';
import { CategoryService } from '../services/category.service';
@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getCategories(@Query() getCategoriesQuery: GetCategoriesQueryDto) {
    return this.categoryService.getCategories(getCategoriesQuery);
  }

  @Get(':id')
  async getCategory(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoryService.getCategory(id);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
}
