import { ShipEntity } from "./entity";
import { DynamoDB } from "aws-sdk";
import { ConfigService } from "@nestjs/config";

export interface ShipRepository {
  create(ship: ShipEntity): Promise<void>;
  findAll(): Promise<ShipEntity[]>;
  findOne(id: string): Promise<ShipEntity>;
}

export class InMemoryShipRepository implements ShipRepository {
  private ships: ShipEntity[] = [];

  async create(ship: ShipEntity) {
    this.ships.push(ship);
    console.log("ship created: ", ship);
  }

  async findAll(): Promise<ShipEntity[]> {
    console.log("found ships: ", this.ships);
    return this.ships;
  }


  async findOne(id: string): Promise<ShipEntity> {
    return this.ships.find((ship) => ship.id === id);
  }
}

export class DynamoDBShipRepository implements ShipRepository {
  private configService: ConfigService = new ConfigService();
  private dynamoDB = new DynamoDB.DocumentClient({
    region: this.configService.get<string>("DYNAMODB_REGION"),
    endpoint: this.configService.get<string>("DYNAMODB_ENDPOINT"),
  });
  private tableName = "ship";

  async create(ship: ShipEntity): Promise<void> {
    await this.dynamoDB.put({
      TableName: this.tableName,
      Item: ship
    }).promise();
  }

  async findAll(): Promise<ShipEntity[]> {
    const result = await this.dynamoDB.scan({
      TableName: this.tableName
    }).promise();
    return result.Items as ShipEntity[];
  }

  async findOne(id: string) {
    const result = await this.dynamoDB.get({
      TableName: this.tableName,
      Key: { id }
    }).promise();
    return result.Item as ShipEntity;
  }
}