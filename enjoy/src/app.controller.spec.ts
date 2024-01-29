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
            getEnjoyDetails: jest.fn(),
            // other UserService methods
          }
        }
      ],
    }).compile();

    appController = module.get<AppController>(AppController);

    appService = module.get<AppService>(AppService);
  });
  describe('getEnjoy', () => {
    it('should return an array of enjoy', async () => {
      const result = ['test'];
      const dto = new AppDto();
      dto.city = 'Paris';      
      dto.category = 'museum';      
      jest.spyOn(appService, 'getEnjoyDetails').mockImplementation(() =>  result as any);
      expect(appController.getEnjoy(dto)).toBe(result)
    });
  });
});