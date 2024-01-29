import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto } from './dto/AppDto';
import {ApiBearerAuth, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Drink} from "./entities/drink.entity";


@Controller()
@ApiBearerAuth()
@ApiTags('drink')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get('/drink')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Drink,
  })
  // @ApiQuery({ name: 'city'})
  getDrink(@Query() {city, rating, types, priceMin, priceMax}: AppDto): any {
    return this.appService.getDrinkDetails(city, rating, types, priceMin, priceMax);
  }
  @Get('/oneDrink')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Drink,
  })
  getOneDrink(@Query() {placeId }: AppDto): any {
    return this.appService.getOneDrink(placeId);
  }
}
