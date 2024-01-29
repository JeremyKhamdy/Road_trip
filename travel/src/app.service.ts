import { Injectable } from '@nestjs/common';
import api from '../lib/api/index';
const { autocompleteSearch, directionDetails } = api;
@Injectable()
export class AppService {
  async getAttractions(input,language): Promise<any> {
    return await autocompleteSearch(input,language);
  }
  getDirectionDetails(origin,destination) {
    const x =  directionDetails(origin,destination);    
    return x;
  }
}