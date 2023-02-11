import { Module } from "@nestjs/common";
import { ShipController } from "./controller";
import { ShipService } from "./service";
import { AuthService } from "../auth/auth.service";
import { DynamoDBShipRepository, InMemoryShipRepository } from "./repository";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ShipController],
  providers: [ShipService, AuthService, {
    provide: "ShipRepository",
    useClass: process.env.REPOSITORY === "DynamoDB" ? DynamoDBShipRepository : InMemoryShipRepository
  }]
})
export class ShipModule {
}
