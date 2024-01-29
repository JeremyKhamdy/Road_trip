import { Injectable } from '@nestjs/common';
import api from '../lib/api/index';
const { autocompleteSearch, enjoyDetails, enjoyDetail } = api;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getEnjoyDetails(city, category, rating, types, priceMin, priceMax): Promise<any> {
    return await enjoyDetails(city,category, rating, types, priceMin, priceMax);
  }
  async getOneEnjoy(placeId): Promise<any> {
    return await enjoyDetail(placeId);
  }
}
