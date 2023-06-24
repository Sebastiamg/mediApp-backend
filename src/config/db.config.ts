import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` });
const configService = new ConfigService();

export const DataBaseSourceConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('USER_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: true,
  autoLoadEntities: true,
};
