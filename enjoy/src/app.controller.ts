import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto } from './dto/AppDto';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Sleep} from "../../sleep/src/entities/sleep.entity";
import {Enjoy} from "./entities/enjoy.entity";


@Controller()
@ApiBearerAuth()
@ApiTags('enjoy')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get('/enjoy')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Enjoy,
  })
  getEnjoy(@Query() { city,category, rating, types, priceMin, priceMax }: AppDto): any {
    return this.appService.getEnjoyDetails(city,category, rating, types, priceMin, priceMax);
  }

  @Get('/oneEnjoy')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Enjoy,
  })
  getOneEnjoy(@Query() {placeId }: AppDto): any {
    return this.appService.getOneEnjoy(placeId);
  }
}
