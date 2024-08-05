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
import { YouthHouseService } from '../services';
import {
  CreateServiceDto,
  CreateYouthCenterDto,
  UpdateServiceDto,
  UpdateYouthCenterDto,
} from '../types/dto';
import { ApiTags } from '@nestjs/swagger';
import { GetStatusQueryDto } from 'src/product/types/dto';
@ApiTags('youth-house')
@Controller('youth-houses')
export class YouthHouseController {
  constructor(private youthHouseService: YouthHouseService) {}

  @Post('/services')
  async createService(@Body() createServiceDto: CreateServiceDto) {
    return this.youthHouseService.createService(createServiceDto);
  }

  @Post()
  async createYouthHouse(@Body() createYouthCenterDto: CreateYouthCenterDto) {
    return this.youthHouseService.createYouthHouse(createYouthCenterDto);
  }

  @Get('/services')
  async getServices(@Query() getServiceQuery: GetStatusQueryDto) {
    return this.youthHouseService.getServices(getServiceQuery);
  }

  @Get()
  async getYouthHouses(@Query() getStoreQuery: GetStatusQueryDto) {
    return this.youthHouseService.getYouthHouses(getStoreQuery);
  }

  @Get(':id')
  async getYouthHouse(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.youthHouseService.getYouthHouse(id);
  }

  @Get('/services/:id')
  async getService(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.youthHouseService.getService(id);
  }

  @Patch('/services/:id')
  async updateService(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.youthHouseService.updateService(id, updateServiceDto);
  }

  @Patch(':id')
  async updateYouthHouse(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateYouthHouseDto: UpdateYouthCenterDto,
  ) {
    return this.youthHouseService.updateYouthHouse(id, updateYouthHouseDto);
  }
}
