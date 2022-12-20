import { Module } from '@nestjs/common';
import { BlueprintsController } from './blueprints/blueprints.controller';
import { BlueprintsService } from './blueprints/blueprints.service';

@Module({
  imports: [],
  controllers: [BlueprintsController],
  providers: [BlueprintsService],
})
export class AppModule {}
