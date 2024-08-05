import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { BackofficeFileController } from './backoffice-controllers';
import { File } from './entities';
import { FileRepository } from './repositories';
import { FileService } from './services';

// extract extension
function getExtension(originalname) {
  const regexExtension = new RegExp('[^.]+$');
  return originalname.match(regexExtension).toString();
}

const multerConfig = {
  dest: process.env.UPLOAD_DIRECTORY_PATH,
  fileFilter(req, file, callback) {
    const authorizedMIMEtypes = [
      'image/*',
      'image/gif',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/svg+xml',
      'image/webp',
      'image/svg+xml',
      'image/vnd.wap.wbmp',
    ];

    if (authorizedMIMEtypes.includes(file.mimetype.toLowerCase())) {
      const extension = getExtension(file.originalname);
      file.extension = extension;

      callback(null, true);
    } else {
      callback(new Error('File mimetype not supported.'), false);
    }
  },
  storage: diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.UPLOAD_DIRECTORY_PATH);
    },
    filename: (req, file, cb) => {
      // format file name to have this: attachment-{uuid}.{extension}
      cb(null, `attachment-${uuidv4()}.${getExtension(file.originalname)}`);
    },
  }),
};
@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register(multerConfig),
  ],
  controllers: [BackofficeFileController],
  providers: [FileService, FileRepository],
  exports: [TypeOrmModule, FileService],
})
export class FileModule {}
