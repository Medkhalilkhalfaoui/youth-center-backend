import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories';
import { CategoryController } from './backoffice-controllers';
import { Category } from './entities';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryRepository,CategoryService],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
