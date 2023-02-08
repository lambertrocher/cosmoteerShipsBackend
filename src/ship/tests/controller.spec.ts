// import { Test } from '@nestjs/testing';
// import { ShipService } from '../service';
// import { ShipController } from "../controller";
//
// describe('ShipsController', () => {
//   let shipsController: ShipController;
//   let shipsService: ShipService;
//
//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [ShipController],
//       providers: [ShipService],
//     }).compile();
//
//     shipsService = moduleRef.get<ShipService>(ShipService);
//     shipsController =
//       moduleRef.get<ShipController>(ShipController);
//   });
//
//   describe('findOne', () => {
//     it('should return one ship', async () => {
//       const result = { id: '1', name: 'test', souls: 10, price: 100 };
//       jest.spyOn(shipsService, 'findOne').mockImplementation(() => result);
//       expect(shipsController.findOne('1')).toBe(result);
//     });
//   });
//
//   describe('findAll', () => {
//     it('should return an array of ships', async () => {
//       const result = [{ id: '1', name: 'test', souls: 10, price: 100 }];
//       jest.spyOn(shipsService, 'findAll').mockImplementation(() => result);
//       expect(shipsController.findAll()).toBe(result);
//     });
//   });
// });
