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
import { UserService } from '../services';
import {
  CreateUserDto,
  IUser,
  UpdatePasswordDto,
  UpdateUserDto,
} from '../types';
import { JwtGuard } from '../../auth/guards';
import { CurrentUser } from '../../shared/decorators';
import { GetStatusQueryDto } from 'src/product/types/dto';

// @ApiBearerAuth()
// @UseGuards(JwtGuard)
@ApiTags('Backoffice User')
@Controller('backoffice/users')
export class UserBackofficeController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() currentUser?: IUser,
  ) {
    return this.userService.createUser(createUserDto, currentUser);
  }

  @Get()
  async getUsers(@Query() getUserQuery: GetStatusQueryDto) {
    return this.userService.getUsers(getUserQuery);
  }

  @Get('Storekeepers')
  async getUsersStorekeepers() {
    return this.userService.getUsersStorekeepers();
  }


  @Get('me')
  async getCurrentUser(@CurrentUser() user: IUser) {
    return this.userService.getUser(user.id);
  }

  @Patch('password')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userService.updatePassword(updatePasswordDto);
  }

  @Get(':id')
  async getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
