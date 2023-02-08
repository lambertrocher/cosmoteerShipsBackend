import { ShipEntity } from "./entity";
import { DynamoDB } from "aws-sdk";

export class InMemoryShipRepository {
  private ships: ShipEntity[] = [];

  findOne(id: string): ShipEntity {
    return this.ships.find((ship) => ship.id === id);
  }

  findAll(): ShipEntity[] {
    console.log("found ships: ", this.ships);
    return this.ships;
  }

  create(ship: ShipEntity) {
    this.ships.push(ship);
    console.log("ship created: ", ship);
  }
}

export class DynamoDBShipRepository {
  private dynamoDB = new DynamoDB.DocumentClient({
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT,
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