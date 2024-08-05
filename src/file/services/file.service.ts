import { Injectable } from '@nestjs/common';
import { FileRepository } from '../repositories';
import { UploadFileMulterDto } from '../types';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async uploadFiles(files: UploadFileMulterDto[]) {
    return this.fileRepository.uploadFiles(files);
  }

  async findFile(id: string) {
    return this.fileRepository
      .createQueryBuilder('file')
      .where('file.id = :id', { id })
      .getOne();
  }

  async findFiles(ids: string[]) {
    return this.fileRepository.findByIds(ids);
  }
}
