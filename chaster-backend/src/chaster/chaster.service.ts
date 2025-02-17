import { Injectable } from "@nestjs/common";
import { DefaultApi, Configuration } from "chaster-api-client";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class ChasterService {
  private api: DefaultApi;

  constructor() {
    this.api = new DefaultApi(
      new Configuration({
        accessToken: process.env.CHASTER_API_TOKEN, // API-Token aus .env-Datei
      })
    );
  }

  async getUserById(userId: string) {
    try {
      const response = await this.api.profileControllerGetUserById(userId);
      return response.data;
    } catch (error) {
      throw new Error(`Fehler beim Abrufen des Benutzers: ${error.message}`);
    }
  }
}
