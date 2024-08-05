import { ConflictException, Injectable } from '@nestjs/common';
import { ProductRepository, UnityRepository } from '../repositories';
import { ProviderRepository } from '../repositories/provider.repository';
import {
  CreateProductDto,
  CreateProviderDto,
  CreateUnityDto,
  GetStatusQueryDto,
  UpdateProductDto,
  UpdateProviderDto,
  UpdateUnityDto,
} from '../types/dto';
import { IProduct } from '../types/interfaces';
import { GetProviderQueryDto } from '../types/dto/get-provider-query.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly unityRepository: UnityRepository,
    private readonly providerRepository: ProviderRepository,
  ) {}

  async createUnity(createUnityDto: CreateUnityDto) {
    const { name } = createUnityDto;
    const exists = await this.unityRepository.findOneBy({
      name: name,
    });
    if (exists) {
      throw new ConflictException('Unity already exists');
    }

    const createCategory = await this.unityRepository.createUnity(
      createUnityDto,
    );
    return createCategory;
  }

  async getUnities(getUnityQuery: GetStatusQueryDto) {
    const { page, pageSize, keyword, orderKey, active } = getUnityQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedUnity, total] = await this.unityRepository.getUnities({
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
      result: fetchedUnity,
    };
  }

  async getUnity(id: string) {
    return this.unityRepository.getUnity(id);
  }

  async createProvider(createProviderDto: CreateProviderDto) {
    const { fullName } = createProviderDto;
    const exists = await this.providerRepository.findOneBy({
      fullName: fullName,
    });
    if (exists) {
      throw new ConflictException('Provider already exists');
    }

    const createProvider = await this.providerRepository.createProvider(
      createProviderDto,
    );
    return createProvider;
  }

  async getProviders(getProviderQuery: GetProviderQueryDto) {
    const { page, pageSize, keyword, orderKey, active } = getProviderQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedProvider, total] = await this.providerRepository.getProviders(
      { take,skip, orderKey, keyword, active },
    );
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
      result: fetchedProvider,
    };
  }

  async getProvider(id: string) {
    return this.providerRepository.getProvider(id);
  }

  async createProduct({
    name,
    code_article,
    description,
    code_a_barre,
    marque,
    family,
    category,
    unity,
    provider,
    childrenProducts,
    parentProduct,
    file
  }: CreateProductDto) {
    const exists = await this.productRepository.findOneBy({
      code_article: code_article,
    });
    if (exists) {
      throw new ConflictException('Code Article already exists');
    }
    const productBody: Partial<IProduct> = {
      name,
      code_article,
      description,
      code_a_barre,
      marque,
      family,
      category,
      unity,
      provider,
      file
    };
    if (parentProduct !== undefined) {
      productBody.parentProduct = parentProduct;
    }

    const createProduct = await this.productRepository.save(
      this.productRepository.create(productBody),
    );

    if (childrenProducts && childrenProducts.length > 0) {
      for (const productOption of childrenProducts) {
        const {
          name,
          code_article,
          description,
          code_a_barre,
          marque,
          family,
          category,
          unity,
          provider,
          file
        } = productOption;

        const option: Partial<IProduct> = {
          name,
          code_article,
          description,
          code_a_barre,
          marque,
          family,
          category,
          unity,
          provider,
          parentProduct: createProduct.id,
          file
        };

        await this.productRepository.save(
          this.productRepository.create(option),
        );
      }
    }
    return createProduct;
  }

  async getProducts(getProductQuery: GetStatusQueryDto) {
    const { page, pageSize, keyword, orderKey, active ,provider,code_article,name} = getProductQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedProduct, total] = await this.productRepository.getProducts({
      take,
      skip,
      orderKey,
      keyword,
      active,
      provider,
      code_article,
      name
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
      result: fetchedProduct,
    };
  }

  async getProduct(id: string) {
    return this.productRepository.getProduct(id);
  }

  async updateUnity(id: string, updateUnityDto: UpdateUnityDto) {
    return this.unityRepository.updateUnity(id, updateUnityDto);
  }

  async updateProvider(id: string, updateProviderDto: UpdateProviderDto) {
    return this.providerRepository.updateProvider(id, updateProviderDto);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.updateProduct(id, updateProductDto);
  }
}
