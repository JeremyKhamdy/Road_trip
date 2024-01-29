import { Injectable } from '@nestjs/common';
import api from '../lib/api/index';
const { autocompleteSearch, sleepDetails, sleepDetail } = api;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getSleepDetails(city, rating, types, priceMin, priceMax): Promise<any> {
    const x = await sleepDetails(city, rating, types, priceMin, priceMax);
    return x;
  }
  async getOneSleep(placeId): Promise<any> {
    return await sleepDetail(placeId);
  }
}
