import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../../auth/guards';
import { FileService } from '../services';
import { UploadFilesDto, UploadFileMulterDto } from '../types';

// @ApiBearerAuth()
// @UseGuards(JwtGuard)
@ApiTags('File')
@Controller('files')
export class BackofficeFileController {
  constructor(private fileService: FileService) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @Body() uploadFilesDto: UploadFilesDto,
    @UploadedFiles() files: UploadFileMulterDto[],
  ) {
 
    return this.fileService.uploadFiles(files);
  }
}
