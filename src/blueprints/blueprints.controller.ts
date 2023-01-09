import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlueprintsService } from './blueprints.service';
import { Blueprint } from './interfaces/blueprint.interface';
import { CreateBlueprintDto } from './dto/create-blueprint.dto';

@Controller('blueprints')
export class BlueprintsController {
  constructor(private blueprintsService: BlueprintsService) {}

  @Get('/login')
  async login(@Query('code') code: string): Promise<string> {
    console.log('calling login route');
    const discordToken = await this.blueprintsService.getDiscordToken(code);
    return await this.blueprintsService.verifyDiscordToken(discordToken);
  }

  @Get(':id')
  findOne(@Param() params): Blueprint {
    console.log('get one');
    return this.blueprintsService.findOne(params.id);
  }

  @Get('/getall')
  findAll(): Blueprint[] {
    console.log('find all called');
    return this.blueprintsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateBlueprintDto) {
    this.blueprintsService.create(createCatDto);
  }
}
