import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import * as querystring from "querystring";

@Injectable()
export class AuthService {
  private configService: ConfigService = new ConfigService();
  private discord_base_url = this.configService.get<string>("DISCORD_BASE_URL");

  async getDiscordToken(code: string) {
    const discord_token_url = `${(this.discord_base_url)}/oauth2/token`;

    const formData = {
      grant_type: "authorization_code",
      code: code,
      client_id: this.configService.get<string>("CLIENT_ID"),
      client_secret: this.configService.get<string>("CLIENT_SECRET"),
      redirect_uri: this.configService.get<string>("REDIRECT_URL")
    };

    try {
      const response = await axios.post(discord_token_url, querystring.stringify((formData)));
      return response.data.access_token;
    } catch (err) {
      console.log(err);
    }
  }

  async verifyDiscordToken(token: string) {
    console.log('verifying token: ', token);
    const discord_me_url = `${this.discord_base_url}/users/@me`;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.get(discord_me_url, config);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
