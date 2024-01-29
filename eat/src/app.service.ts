import { Injectable } from '@nestjs/common';
import api from '../lib/api/index';
const { autocompleteSearch, eatDetails,eatDetail } = api;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getEatDetails(city, rating, types, priceMin, priceMax): Promise<any> {
    return await eatDetails(city, rating, types, priceMin, priceMax);
    
  }
  async getOneEat(placeId): Promise<any> {
    return await eatDetail(placeId);
  }
}
