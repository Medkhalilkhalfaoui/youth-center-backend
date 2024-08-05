/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
 import { static as expressStatic } from 'express';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';


import helmet from 'helmet';
import { join } from 'path';
import { createStream } from 'rotating-file-stream';
import * as morgan from 'morgan';
import * as figlet from 'figlet';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  /**
   * Security and optimization middlewares
   */
  app.enableCors();
  app.use(compression());

  if (configService.get('NODE_ENV') === 'production') {
    app.use(helmet());
  }

  /** Morgan middleware
   * log all requests in a specified format (ex. Apache combined) to one log file within specified interval
   * */
  const accessLogStream = createStream(configService.get('LOG_FILENAME'), {
    interval: configService.get('LOG_ROTATE_INTERVAL'),
    path: join(configService.get('LOG_DIRECTORY_PATH')),
  });

  app.use(
    morgan(configService.get('LOG_MORGAN_PROD_FORMAT'), {
      stream: accessLogStream,
    }),
  );

  /** Global ** prefix */
  app.setGlobalPrefix(configService.get('API_PREFIX'));

  /** Global validation
   * validate all requests arguments using dto files
   * */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (configService.get('NODE_ENV') !== 'production') {
    /** Swagger configuration */
    const options = new DocumentBuilder()
      .setTitle(configService.get('SWAGGER_TITLE'))
      .setVersion(configService.get('SWAGGER_VERSION'))
      .setDescription(configService.get('SWAGGER_DESCRIPTION'))
      .setBasePath(configService.get('API_PREFIX'))
      .addServer(configService.get('SWAGGER_TARGET_SERVER'))
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options, {
      ignoreGlobalPrefix: true,
      deepScanRoutes: true,
    });
    SwaggerModule.setup(configService.get('SWAGGER_PREFIX'), app, document);

    /** Morgan Config */
    app.use(morgan(configService.get('LOG_MORGAN_DEV_FORMAT')));
  }

  /** Serve static files */
  app.use(
    '/public/uploads/',
    expressStatic(configService.get('UPLOAD_DIRECTORY_PATH')),
  );

  /** Start NestApplication HTTP server */
  const port = parseInt(configService.get('PORT'), 10) || 3000;
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(port);
  console.log(`Nest app listening at port ${port}`);

  /** Figlet welcome message */
  figlet("YOUTH - CENTER - ENGINE", function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
  });
}

bootstrap();
