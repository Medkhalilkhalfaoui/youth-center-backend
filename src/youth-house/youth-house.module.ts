import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YouthHouseController } from './backoffice-controllers/youth-house.controller';
import { YouthHouseService } from './services';
import { ServiceRepository, ServiceYouthCenterRepository, YouthCenterRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [YouthHouseController],
  providers: [YouthHouseService, ServiceRepository, YouthCenterRepository,ServiceYouthCenterRepository],
  exports: [TypeOrmModule, YouthHouseService],
})
export class YouthHouseModule {}
