import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto } from './dto/AppDto';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Travel} from "./entities/travel.entity";


@Controller()
@ApiBearerAuth()
@ApiTags('travel')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/travel')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Travel,
  })
  getTravel(@Query() { origin, destination }: AppDto) {
    return this.appService.getDirectionDetails(origin,destination);
  }
}
