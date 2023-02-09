import { Module } from "@nestjs/common";
import { ShipController } from "./controller";
import { ShipService } from "./service";
import { AuthService } from "../auth/auth.service";

@Module({
  controllers: [ShipController],
  providers: [ShipService, AuthService],
})
export class ShipModule {}
