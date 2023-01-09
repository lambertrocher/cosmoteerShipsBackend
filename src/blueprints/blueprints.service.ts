import { Injectable } from '@nestjs/common';
import { Blueprint } from './interfaces/blueprint.interface';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlueprintsService {
  private readonly blueprints: Blueprint[] = [];

  constructor(private configService: ConfigService) {}

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

  async verifyDiscordToken(token: string) {
    const url = 'https://discord.com/api/users/@me';
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  findOne(id: string): Blueprint {
    return this.blueprints.find((blueprint) => blueprint.id === id);
  }

  findAll(): Blueprint[] {
    return this.blueprints;
  }

  create(blueprint: Blueprint) {
    blueprint.id = uuidv4();
    this.blueprints.push(blueprint);
  }
}
