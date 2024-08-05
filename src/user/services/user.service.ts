import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserRepository } from '../repositories';
import {
  CreateUserDto,
  IUser,
  UpdatePasswordDto,
  UpdateUserDto,
} from '../types';
import { GetStatusQueryDto } from 'src/product/types/dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userBody: CreateUserDto, currentUser?: IUser) {
    const fetchedUser = await this.userRepository.findOneBy({
      username: userBody.username,
    });
    if (fetchedUser) {
      throw new ConflictException(
        `Username: '${fetchedUser.username}' already exist`,
      );
    }

    const createdUser = await this.userRepository.createUser(
      userBody,
      currentUser,
    );

    return this.userRepository.findOneBy({ id: createdUser.id });
  }

  async getUsers(getUserQuery: GetStatusQueryDto) {
    const { page, pageSize, keyword, orderKey, active } = getUserQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedUser, total] = await this.userRepository.getUsers({
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
      result: fetchedUser,
    };
  }

  async getUsersStorekeepers() {
    return this.userRepository.getUsersStorekeepers();
  }

  async updateUser(userId: string, userBody: UpdateUserDto) {
    const fetchedUser = await this.userRepository.findOneBy({ id: userId });
    if (!fetchedUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const updatedUser = await this.userRepository.updateUser(
      fetchedUser.id,
      userBody,
    );

    return this.userRepository.findOneBy({ id: updatedUser.id });
  }

  async getUser(id: string) {
    return this.userRepository.getUser(id);
  }

  async getUserAuthInfo(username: string) {
    return this.userRepository.getUserAuthInfo(username);
  }

  async updatePassword({
    username,
    oldPassword,
    newPassword,
  }: UpdatePasswordDto) {
    const fetchedUser = await this.getUserAuthInfo(username);

    if (!fetchedUser) {
      throw new NotFoundException(
        `Client with username ${username} not found!`,
      );
    }

    const isMatch = await this._matchPassword(
      oldPassword,
      fetchedUser.password,
    );
    if (!isMatch) {
      throw new ConflictException(`Password mismatch`);
    }

    await this.userRepository.updateUser(fetchedUser.id, {
      password: newPassword,
    });

    return this.userRepository.getUser(fetchedUser.id);
  }

  private async _matchPassword(plainPassword: string, hashedPassword: string) {
    return compare(plainPassword, hashedPassword);
  }
}
