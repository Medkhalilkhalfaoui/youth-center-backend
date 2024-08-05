import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseService, StoreService } from './services';
import { Hangar, Store } from './entities';
import {
  HangarController,
  PurchaseController,
  StoreController,
} from './backoffice-controllers';
import { HangarService } from './services/hangar.service';
import {
  HangarReceptionDetailsRepository,
  HangarRepository,
  PurchaseDetailsRepository,
  PurchaseRepository,
  StoreRepository,
} from './repositories';
import { ReceptionRepository } from './repositories/reception.repository';
import { ReceptionDetailsRepository } from './repositories/reception-details.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Hangar])],
  controllers: [StoreController, HangarController, PurchaseController],
  providers: [
    StoreService,
    HangarService,
    StoreRepository,
    HangarRepository,
    PurchaseService,
    PurchaseRepository,
    PurchaseDetailsRepository,
    ReceptionRepository,
    ReceptionDetailsRepository,
    HangarReceptionDetailsRepository,
  ],

  exports: [TypeOrmModule, StoreService, HangarService, PurchaseService],
})
export class StoreModule {}
