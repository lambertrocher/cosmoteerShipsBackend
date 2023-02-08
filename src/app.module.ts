import { Module } from '@nestjs/common';
import { ShipService } from './ship/service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ShipController } from "./ship/controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ShipController, AuthController],
  providers: [ShipService, AuthService],
})
export class AppModule {}
