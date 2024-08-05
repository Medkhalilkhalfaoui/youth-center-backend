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
import { ProductService } from '../services';
import { CreateProviderDto, GetStatusQueryDto, UpdateProviderDto } from '../types/dto';
import { ApiTags } from '@nestjs/swagger';
import { GetProviderQueryDto } from '../types/dto/get-provider-query.dto';

@ApiTags('Provider')
@Controller('providers')
export class ProviderController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProvider(@Body() createProviderDto: CreateProviderDto) {
    return this.productService.createProvider(createProviderDto);
  }

  @Get()
  async getProviders(@Query() getProviderQuery: GetProviderQueryDto) {
    return this.productService.getProviders(getProviderQuery);
  }

  @Get(':id')
  async getProvider(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productService.getProvider(id);
  }

  @Patch(':id')
  async updateProvider(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.productService.updateProvider(id, updateProviderDto);
  }
}
