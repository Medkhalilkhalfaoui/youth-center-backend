import { Injectable } from '@nestjs/common';
import { HangarRepository } from '../repositories';
import { CreateHangarDto, UpdateHangarDto } from '../types/dto';
import { GetStatusQueryDto } from 'src/product/types/dto';

@Injectable()
export class HangarService {
  constructor(private readonly hangarRepository: HangarRepository) {}

  async createHangar(createHangarDto: CreateHangarDto) {
    const createHangar = await this.hangarRepository.createHangar(
      createHangarDto,
    );
    return createHangar;
  }

  async getHangars(getHangarQuery: GetStatusQueryDto) {
    const { page, pageSize, keyword, orderKey, active } = getHangarQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedHangar, total] = await this.hangarRepository.getHangars({
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
      result: fetchedHangar,
    };
  }

  async getHangar(id: string) {
    return this.hangarRepository.getHangar(id);
  }

  async updateHangar(id: string, updateHangarDto: UpdateHangarDto) {
    return this.hangarRepository.updateHangar(id, updateHangarDto);
  }
}
