import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ServiceYouthCenter } from '../entities';

@Injectable()
export class ServiceYouthCenterRepository extends Repository<ServiceYouthCenter> {
  constructor(private dataSource: DataSource) {
    super(ServiceYouthCenter, dataSource.createEntityManager());
  }

  async createServiceYouthCenter(YouthCenterId: string, servicesIds: string[]) {
    const serviceYouthCenterBody = servicesIds.map((servicesId) =>
      this.create({ service: servicesId, youthCenter: YouthCenterId }),
    );

    return this.save(serviceYouthCenterBody);
  }
}
