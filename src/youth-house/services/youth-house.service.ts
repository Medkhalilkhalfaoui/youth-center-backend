import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import {
  ServiceRepository,
  ServiceYouthCenterRepository,
  YouthCenterRepository,
} from '../repositories';
import {
  CreateServiceDto,
  CreateYouthCenterDto,
  UpdateServiceDto,
  UpdateYouthCenterDto,
} from '../types/dto';
import { GetStatusQueryDto } from 'src/product/types/dto';

@Injectable()
export class YouthHouseService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly youthCenterRepository: YouthCenterRepository,
    private readonly serviceYouthCenterRepository: ServiceYouthCenterRepository,
  ) {}

  async createService(createServiceDto: CreateServiceDto) {
    const { name } = createServiceDto;
    const exists = await this.serviceRepository.findOneBy({
      name: name,
    });
    if (exists) {
      throw new ConflictException('Service already exists');
    }

    const createService = await this.serviceRepository.createService(
      createServiceDto,
    );
    return createService;
  }

  async createYouthHouse({ services, ...youthBody }: CreateYouthCenterDto) {
    // const { name } = createYouthCenterDto;
    const exists = await this.youthCenterRepository.findOneBy({
      name: youthBody.name,
    });
    if (exists) {
      throw new ConflictException('Youth House already exists');
    }

    if (services) {
      const fetchedServices = await this.serviceRepository.findByIds(services);
      if (fetchedServices.length < services.length) {
        throw new BadRequestException('Some or all services does not exist');
      }
    }
    const createYouthHouse = await this.youthCenterRepository.createYouthHouse(
      youthBody,
    );

    if (services) {
      await this.serviceYouthCenterRepository.createServiceYouthCenter(
        createYouthHouse.id,
        services,
      );
    }
    return createYouthHouse;
  }

  async getServices(getServiceQuery: GetStatusQueryDto) {
    const { page, pageSize, keyword, orderKey, active } = getServiceQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedService, total] = await this.serviceRepository.getServices({
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
      result: fetchedService,
    };
  }

  async getYouthHouses(getYouthCenterQuery: GetStatusQueryDto) {
    const { page, pageSize, keyword, orderKey, active } = getYouthCenterQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedYouthHouses, total] =
      await this.youthCenterRepository.getYouthHouses({
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
      result: fetchedYouthHouses,
    };
  }

  async getYouthHouse(id: string) {
    return this.youthCenterRepository.getYouthHouse(id);
  }
  async getService(id: string) {
    return this.serviceRepository.getService(id);
  }

  async updateYouthHouse(
    id: string,
    updateYouthHouseDto: UpdateYouthCenterDto,
  ) {
    return this.youthCenterRepository.updateYouthHouse(id, updateYouthHouseDto);
  }

  async updateService(id: string, updateServiceDto: UpdateServiceDto) {
    return this.serviceRepository.updateService(id, updateServiceDto);
  }
}
