import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { StoreService } from '../services';
import { CreateStoreDto, UpdateStoreDto } from '../types/dto';
import { ApiTags } from '@nestjs/swagger';
import { GetStatusQueryDto } from 'src/product/types/dto';
@ApiTags('Store')
@Controller('stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.createStore(createStoreDto);
  }

  @Get()
  async getStores(@Query() getStoreQuery: GetStatusQueryDto) {
    return this.storeService.getStores(getStoreQuery);
  }

  @Get(':id')
  async getStore(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.storeService.getStore(id);
  }

  @Patch(':id')
  async updateStore(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return this.storeService.updateStore(id, updateStoreDto);
  }
}
