import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './services';
import { ProductRepository, UnityRepository } from './repositories';
import { Product } from './entities';
import { Module } from '@nestjs/common';
import { ProductController } from './backoffice-controllers';
import { UnityController } from './backoffice-controllers/unity.controller';
import { ProviderController } from './backoffice-controllers/provider.controller';
import { ProviderRepository } from './repositories/provider.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController, UnityController, ProviderController],
  providers: [
    ProductRepository,
    ProductService,
    UnityRepository,
    ProviderRepository,
  ],
  exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
