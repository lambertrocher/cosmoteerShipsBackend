import { Injectable } from '@nestjs/common';
import { Blueprint } from './interfaces/cat.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BlueprintsService {
  private readonly blueprints: Blueprint[] = [];

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
