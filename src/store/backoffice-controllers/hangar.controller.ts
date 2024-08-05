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
import { HangarService } from '../services/hangar.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateHangarDto, UpdateHangarDto } from '../types/dto';
import { GetStatusQueryDto } from 'src/product/types/dto';
@ApiTags('Hangar')
@Controller('hangars')
export class HangarController {
  constructor(private hangarService: HangarService) {}

  @Post()
  async createHangar(@Body() createHangarDto: CreateHangarDto) {
    return this.hangarService.createHangar(createHangarDto);
  }

  @Get()
  async getHangars(@Query() getHangarQuery: GetStatusQueryDto) {
    return this.hangarService.getHangars(getHangarQuery);
  }

  @Get(':id')
  async getHangar(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.hangarService.getHangar(id);
  }

  @Patch(':id')
  async updateHangar(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateHangarDto: UpdateHangarDto,
  ) {
    return this.hangarService.updateHangar(id, updateHangarDto);
  }
}
