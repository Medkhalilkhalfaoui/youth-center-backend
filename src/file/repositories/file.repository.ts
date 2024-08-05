import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { File } from '../entities';

@Injectable()
export class FileRepository extends Repository<File> {
  constructor(private dataSource: DataSource) {
    super(File, dataSource.createEntityManager());
  }

  async uploadFiles(filesBody: Partial<File>[]): Promise<File[]> {
    const createdfiles: File[] = [];

    for (const fileBody of filesBody) {
      const file = new File();
      Object.assign(file, fileBody);
      createdfiles.push(file);
    }

    return this.save(createdfiles);
  }

  async getFileById(id: string) {
    return this.createQueryBuilder('file')
      .leftJoinAndSelect('file.post', 'post')
      .where('file.id = :id', { id })
      .getOne();
  }

  async getfileByPostId(postId) {
    return this.createQueryBuilder('file')
      .leftJoinAndSelect('file.post', 'post')
      .where('post.id = :postId', { postId })
      .getMany();
  }

  async deleteFile(id: string): Promise<void> {
    await this.delete(id);
  }
}
