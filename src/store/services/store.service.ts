import { ConflictException, Injectable } from '@nestjs/common';
import { HangarRepository, StoreRepository } from '../repositories';
import { CreateStoreDto, UpdateStoreDto } from '../types/dto';
import { GetStatusQueryDto } from 'src/product/types/dto';
import { IHangar, IStore } from '../types';

@Injectable()
export class StoreService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly hangarRepository: HangarRepository,
  ) {}

  async createStore({ name, address, city, hangars }: CreateStoreDto) {
    const StoreBody: Partial<IStore> = {
      name,
      address,
      city,
    };

    const createStore = await this.storeRepository.save(
      this.storeRepository.create(StoreBody),
    );

    if (hangars && hangars.length > 0) {
      for (const hangar of hangars) {
        const { name, surface } = hangar;
        const hangar1: Partial<IHangar> = {
          name,
          surface,
          store: createStore.id,
        };

        await this.hangarRepository.save(this.hangarRepository.create(hangar1));
      }
    }
    return createStore;
  }

  async getStores(getStoreQuery: GetStatusQueryDto) {
    const { page, pageSize, keyword, orderKey, active } = getStoreQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedStore, total] = await this.storeRepository.getStores({
      take,
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
      result: fetchedStore,
    };
  }

  async getStore(id: string) {
    return this.storeRepository.getStore(id);
  }

  async updateStore(id: string, updateStoreDto: UpdateStoreDto) {
    return this.storeRepository.updateStore(id, updateStoreDto);
  }
}
