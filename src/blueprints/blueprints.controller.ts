import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { BlueprintsService } from './blueprints.service';
import { Blueprint } from './interfaces/blueprint.interface';
import { CreateBlueprintDto } from './dto/create-blueprint.dto';

@Controller('blueprints')
export class BlueprintsController {
  constructor(private blueprintsService: BlueprintsService) {}

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.blueprintsService.findOne(id);
  }

  @Get('/')
  findAll(): Blueprint[] {
    return this.blueprintsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateBlueprintDto) {
    this.blueprintsService.create(createCatDto);
  }
}
