import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlueprintsService } from './blueprints.service';
import { Blueprint } from './interfaces/cat.interface';
import { CreateBlueprintDto } from './dto/create-blueprint.dto';

@Controller('blueprints')
export class BlueprintsController {
  constructor(private blueprintsService: BlueprintsService) {}

  @Get(':id')
  findOne(@Param() params): Blueprint {
    return this.blueprintsService.findOne(params.id);
  }

  @Get()
  findAll(): Blueprint[] {
    return this.blueprintsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateBlueprintDto) {
    this.blueprintsService.create(createCatDto);
  }
}
