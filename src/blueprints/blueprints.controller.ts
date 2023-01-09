import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlueprintsService } from './blueprints.service';
import { Blueprint } from './interfaces/blueprint.interface';
import { CreateBlueprintDto } from './dto/create-blueprint.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller('blueprints')
export class BlueprintsController {
  constructor(
    private blueprintsService: BlueprintsService,
    private configService: ConfigService,
  ) {}

  async getDiscordToken(code: string) {
    const discord_base_url = this.configService.get<string>('DISCORD_BASE_URL');
    const discord_token_url = `${discord_base_url}/oauth2/token`;
    const client_id = this.configService.get<string>('CLIENT_ID');
    const client_secret = this.configService.get<string>('CLIENT_SECRET');
    const redirect_url = this.configService.get<string>('REDIRECT_URL');

    const formData = new URLSearchParams();
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append('client_id', client_id);
    formData.append('client_secret', client_secret);
    formData.append('redirect_uri', redirect_url);

    try {
      const response = await axios.post(discord_token_url, formData);
      return response.data.access_token;
    } catch (err) {
      console.log(err);
    }
  }

  @Get('/login')
  async login(@Query('code') code: string): Promise<string> {
    console.log('calling login route');
    return await this.getDiscordToken(code);
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
