import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { AuthModule } from './auth/auth.module';
import { DataBaseSourceConfig } from './config/db.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot(DataBaseSourceConfig),
    UsersModule,
    AuthModule,
    AppointmentModule,
  ],
  controllers: [],
})
export class AppModule {}
