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
            getEatDetails: jest.fn(),
          }
        }
      ],
    }).compile();

    appController = module.get<AppController>(AppController);

    appService = module.get<AppService>(AppService);
  });
  describe('getEat', () => {
    it('should return an array of eat', async () => {
      const result = ['test'];
      const dto = new AppDto();
      dto.city = 'Paris';      
      jest.spyOn(appService, 'getEatDetails').mockImplementation(() =>  result as any);
      expect(appController.getEat(dto)).toBe(result)
    });
  });
});