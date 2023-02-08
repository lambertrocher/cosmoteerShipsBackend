import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ShipService } from './service';
import { GetShipOutput, CreateShipInput } from "./dto";

@Controller('ships')
export class ShipController {
  constructor(private shipsService: ShipService) {}

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.shipsService.findOne(id);
  }

  @Get('/')
  async findAll(): Promise<GetShipOutput[]> {
    return await this.shipsService.findAll();
  }

  @Post()
  async create(@Body() createShipDto: CreateShipInput) {
    await this.shipsService.create(createShipDto);
  }
}
