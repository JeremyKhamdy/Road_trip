import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto } from './dto/AppDto';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Sleep} from "./entities/sleep.entity";

@Controller()
@ApiBearerAuth()
@ApiTags('sleep')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get('/sleep')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Sleep,
  })
  getSleep(@Query() { city, rating, types, priceMin, priceMax}: AppDto): any {
    return this.appService.getSleepDetails(city, rating, types, priceMin, priceMax);
  }
  @Get('/oneSleep')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Sleep,
  })
  getOneSleep(@Query() {placeId }: AppDto): any {
    return this.appService.getOneSleep(placeId);
  }
}
