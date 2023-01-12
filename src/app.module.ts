import { Module } from '@nestjs/common';
import { BlueprintsController } from './blueprints/blueprints.controller';
import { BlueprintsService } from './blueprints/blueprints.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [BlueprintsController, AuthController],
  providers: [BlueprintsService, AuthService],
})
export class AppModule {}
