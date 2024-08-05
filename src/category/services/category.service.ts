import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories';
import {
  CreateCategoryDto,
  GetCategoriesQueryDto,
  UpdateCategoryDto,
} from '../types/dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const exists = await this.categoryRepository.findOneBy({
      name: name,
    });
    if (exists) {
      throw new ConflictException('Category already exists');
    }

    const createCategory = await this.categoryRepository.createCategory(
      createCategoryDto,
    );
    return createCategory;
  }

  async getCategories(getCategoriesQuery: GetCategoriesQueryDto) {
    const { page, pageSize, keyword, orderKey, active } = getCategoriesQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedCategory, total] =
      await this.categoryRepository.getCategories({
        skip,
        orderKey,
        keyword,
        active,
      });
    let nextPage = 0;
    let hasNext = false;
    if (total > page * pageSize) {
      hasNext = true;
      nextPage = page + 1;
    }
    return {
      total,
      hasNext,
      nextPage,
      result: fetchedCategory,
    };
  }

  async getCategory(id: string) {
    return this.categoryRepository.getCategory(id);
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.updateCategory(id, updateCategoryDto);
  }
}
