import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePurchaseDto, CreateReceptionDto, UpdateStatusPurchaseDto } from '../types/dto';
import { PurchaseService } from '../services';
import { CurrentUser } from 'src/shared/decorators';
import { IUser } from 'src/user/types';
import { JwtGuard } from 'src/auth/guards';
import { GetQueryDto } from '../types/dto/get-query.dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('Purchase')
@Controller('purchases')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}
  @Post()
  async createPurchase(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @CurrentUser() user: IUser,
  ) {
    return this.purchaseService.createPurchase(createPurchaseDto, user.id);
  }

  @Post('/reception')
  async createReception(@Body() createReceptionDto:CreateReceptionDto,@CurrentUser() user:IUser) {
    return this.purchaseService.createReception(createReceptionDto, user.id);
  }

  @Get()
  async getPurchases(@Query() getQuery:GetQueryDto) {
    return this.purchaseService.getPurchases(getQuery);
  }

  @Get('/reception')
  async getReceptions() {
    return this.purchaseService.getReceptions();
  }


  @Get('/:id')
  async getPurchaseById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.purchaseService.getPurchaseById(id);
  }


  @Get('/reception/:id')
  async getReceptionById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.purchaseService.getReceptionById(id);
  }

  @Patch('/:id')
  async updateStatusPurchase(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    updateStatusPurchaseDto: UpdateStatusPurchaseDto,
  ) {
    return this.purchaseService.updateStatusPurchase(id, updateStatusPurchaseDto);
  }
}
