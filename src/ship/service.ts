import { Injectable } from "@nestjs/common";
import { CreateShipInput } from "./dto";
import { DynamoDBShipRepository } from "./repository";
import { ShipEntity } from "./entity";
import { v4 } from "uuid";

@Injectable()
export class ShipService {
  // private shipRepository = new InMemoryShipRepository();
  private shipRepository = new DynamoDBShipRepository();

  async findOne(id: string): Promise<ShipEntity> {
    return await this.shipRepository.findOne(id);
  }

  async findAll(): Promise<ShipEntity[]> {
    return await this.shipRepository.findAll();
  }

  async create(shipDto: CreateShipInput) {
    const ship = new ShipEntity({
      id: v4(),
      name: shipDto.name,
      souls: shipDto.souls,
      price: shipDto.price,
    });
    await this.shipRepository.create(ship);
  }
}
