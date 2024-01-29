import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto } from './dto/AppDto';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Eat} from "./entities/eat.entity";


@Controller()
@ApiBearerAuth()
@ApiTags('eat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get('/eat')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Eat,
  })
  getEat(@Query() { city, rating, types, priceMin, priceMax }: AppDto): any {
    return this.appService.getEatDetails(city, rating, types, priceMin, priceMax);
  }
  @Get('/oneEat')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Eat,
  })
  getOneEat(@Query() {placeId }: AppDto): any {
    return this.appService.getOneEat(placeId);
  }
}
