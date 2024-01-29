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
            getSleepDetails: jest.fn(),
          }
        }
      ],
    }).compile();

    appController = module.get<AppController>(AppController);

    appService = module.get<AppService>(AppService);
  });
  describe('getSleep', () => {
    it('should return an array of sleep', async () => {
      const result = ['test'];
      const dto = new AppDto();
      dto.city = 'Paris';      
      jest.spyOn(appService, 'getSleepDetails').mockImplementation(() =>  result as any);
      expect(appController.getSleep(dto)).toBe(result)
    });
  });
});