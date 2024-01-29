import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDto } from './dto/AppDto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  // let fireBaseAuthService: FireBaseAuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getDirectionDetails: jest.fn(),
            // other UserService methods
          }
        }
      ],
    }).compile();

    appController = module.get<AppController>(AppController);

    appService = module.get<AppService>(AppService);
  });
  describe('getTravel', () => {
    it('should return an array of travel', async () => {
      const result = ['test'];
      const dto = new AppDto();
      dto.origin = 'Paris';
      dto.destination = 'Lyon';
      
      jest.spyOn(appService, 'getDirectionDetails').mockImplementation(() =>  result as any);
      expect(appController.getTravel(dto)).toBe(result)
    });
  });
});