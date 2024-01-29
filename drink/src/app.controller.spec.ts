import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDto } from './dto/AppDto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getDrinkDetails: jest.fn(),
          }
        }
      ],
    }).compile();

    appController = module.get<AppController>(AppController);

    appService = module.get<AppService>(AppService);
  });
  describe('getDrink', () => {
    it('should return an array of drink', async () => {
      const result = ['test'];
      const dto = new AppDto();
      dto.city = 'Paris';
      jest.spyOn(appService, 'getDrinkDetails').mockImplementation(() =>  result as any);
      expect(appController.getDrink(dto)).toBe(result)
    });
  });
});