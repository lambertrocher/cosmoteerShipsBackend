import { Test } from '@nestjs/testing';
import { BlueprintsController } from './blueprints.controller';
import { BlueprintsService } from './blueprints.service';

describe('BlueprintsController', () => {
  let blueprintsController: BlueprintsController;
  let blueprintsService: BlueprintsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BlueprintsController],
      providers: [BlueprintsService],
    }).compile();

    blueprintsService = moduleRef.get<BlueprintsService>(BlueprintsService);
    blueprintsController =
      moduleRef.get<BlueprintsController>(BlueprintsController);
  });

  describe('findOne', () => {
    it('should return one blueprint', async () => {
      const result = { id: '1', name: 'test', souls: 10, price: 100 };
      jest.spyOn(blueprintsService, 'findOne').mockImplementation(() => result);
      expect(blueprintsController.findOne('1')).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of blueprints', async () => {
      const result = [{ id: '1', name: 'test', souls: 10, price: 100 }];
      jest.spyOn(blueprintsService, 'findAll').mockImplementation(() => result);
      expect(blueprintsController.findAll()).toBe(result);
    });
  });
});
