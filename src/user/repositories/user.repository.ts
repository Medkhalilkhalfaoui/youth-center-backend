import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from '../entities';
import { CreateUserDao, IUser } from '../types';
import { UpdateUserDao } from '../types/dao/update-user.dao';
import { IFindStatusOptions } from 'src/category/types';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDao: CreateUserDao, currentUser?: IUser) {
    return this.save(this.create(createUserDao), { data: { currentUser } });
  }

  async getUsers(findUserQuery: IFindStatusOptions) {
    const { active, take, skip, keyword, orderKey } = findUserQuery;
    let query = this.createQueryBuilder('users').leftJoinAndSelect(
      'users.store',
      'store',
    );
    if (active !== undefined) {
      query = query.where('users.isActive = :isActive', {
        isActive: active,
      });
    }
    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;

      query.andWhere('(CAST(users.username AS varchar) LIKE UPPER(:keyword))', {
        keyword: KEYWORD_SQL_FORMATTED,
      });

      query.orWhere('UPPER(users.email) LIKE UPPER(:keyword)', {
        keyword: KEYWORD_SQL_FORMATTED,
      });

      query.orWhere('UPPER(users.firstName) LIKE UPPER(:keyword)', {
        keyword: KEYWORD_SQL_FORMATTED,
      });

      query.orWhere('UPPER(users.lastName) LIKE UPPER(:keyword)', {
        keyword: KEYWORD_SQL_FORMATTED,
      });
    }
    if (skip) {
      query.skip(skip);
    }

    if (take) {
      query.take(take);
    }

    if (orderKey) {
      query.orderBy('products.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async getUsersStorekeepers() {
    return this.createQueryBuilder('users')
      .where('users.job = :job', {
        job: 'STOREKEEPER',
      })
      .getMany();
  }

  async getUser(id: string) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.store', 'store')
      .where('user.id = :id', { id })
      .getOne();
  }

  async updateUser(id: string, updateUserDao: UpdateUserDao) {
    const updatedUser = await this.findOneBy({ id });
    Object.assign(updatedUser, updateUserDao);

    return this.save(updatedUser);
  }

  async getUserAuthInfo(username: string) {
    return this.createQueryBuilder('user')
      .addSelect(['user.password'])
      .where('user.username = :username', { username })
      .getOne();
  }
}
