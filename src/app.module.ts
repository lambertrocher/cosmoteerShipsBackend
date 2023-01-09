import { Module } from '@nestjs/common';
import { BlueprintsController } from './blueprints/blueprints.controller';
import { BlueprintsService } from './blueprints/blueprints.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [BlueprintsController],
  providers: [BlueprintsService],
})
export class AppModule {}
