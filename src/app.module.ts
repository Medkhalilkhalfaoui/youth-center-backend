import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Category } from './category/entities';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { Product, Provider, Unity } from './product/entities';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AuditLog } from './audit-log/entities';
import { GlobalSubscriber } from './subscribers/global.subscriber';
import {
  Hangar,
  HangarReceptionDetails,
  Purchase,
  PurchaseDetails,
  Reception,
  ReceptionDetails,
  Store,
} from './store/entities';
import { StoreModule } from './store/store.module';
import { YouthHouseModule } from './youth-house/youth-house.module';
import { Service, ServiceYouthCenter, YouthCenter } from './youth-house/entities';
import { FileModule } from './file/file.module';
import { File } from './file/entities';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { Role } from './role-permission/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        subscribers: [GlobalSubscriber],
        database: configService.get('DB_DATABASE_NAME'),
        options: {
          encrypt: false, // MSSQL-specific option
        },
        logging: true,
        synchronize: true,
        entities: [
          User,
          Category,
          Product,
          AuditLog,
          Unity,
          Provider,
          Store,
          Hangar,
          Reception,
          Purchase,
          ReceptionDetails,
          PurchaseDetails,
          Service,
          YouthCenter,
          File,
          Role,
          HangarReceptionDetails,
          ServiceYouthCenter
        ],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    AuditLogModule,
    StoreModule,
    YouthHouseModule,
    FileModule,
    RolePermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
