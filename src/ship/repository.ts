import { ShipEntity } from "./entity";
import { DynamoDB } from "aws-sdk";
import { ConfigService } from "@nestjs/config";

export class DynamoDBShipRepository {
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