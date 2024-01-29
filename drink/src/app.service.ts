import { Injectable } from '@nestjs/common';
import api from '../lib/api/index';
const { autocompleteSearch, drinkDetails, drinkDetail } = api;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getDrinkDetails(city, filters, types, priceMin, priceMax): Promise<any> {
    return await drinkDetails(city, filters, types, priceMin, priceMax);
    
  }

  async getOneDrink(placeId): Promise<any> {
    return await drinkDetail(placeId);
  }
}
