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
import { CreateUnityDto, GetStatusQueryDto, UpdateUnityDto } from '../types/dto';

@ApiTags('Unity')
@Controller('unities')
export class UnityController {
  constructor(private productService: ProductService) {}

  @Post()
  async createUnity(@Body() createUnityDto: CreateUnityDto) {
    return this.productService.createUnity(createUnityDto);
  }

  @Get()
  async getUnities(@Query() getUnityQuery: GetStatusQueryDto) {
    return this.productService.getUnities(getUnityQuery);
  }

  @Get(':id')
  async getUnity(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productService.getUnity(id);
  }

  @Patch(':id')
  async updateUnity(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUnityDto: UpdateUnityDto,
  ) {
    return this.productService.updateUnity(id, updateUnityDto);
  }
}
