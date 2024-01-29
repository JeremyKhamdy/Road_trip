import {ApiProperty} from "@nestjs/swagger";

export class AppDto {

    // city: string;
    // placeId: string;
    // rating: number;
    // priceMin: number;
    // priceMax: number;
    // types: any;

    /**
     * The name of the city
     * @example Lyon
     */
    @ApiProperty({ example: 'Lyon', description: 'The destination city', required: true })
    city: string;
    /**
     * Place Id for google maps
     * @example ChIJ9wIAxXnVwkcRwVvfmRNpOII
     */
    @ApiProperty({ example: 'ChIJ9wIAxXnVwkcRwVvfmRNpOII', description: 'Place Id for google maps', required: false })
    placeId: string;

    @ApiProperty({ example: 1, description: 'User\'s Rating (1 to 5)', required: true })
    rating: number;

    @ApiProperty({ example: 0, description: 'Price min (0 to 4)', required: true })
    priceMin: number;

    @ApiProperty({ example: 0, description: 'Price max (0 to 4)', required: true })
    priceMax: number;

    @ApiProperty({ example: ['restaurants'], description: 'Type of search', required: false })
    types: any;
  }