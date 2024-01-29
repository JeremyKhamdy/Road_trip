import { ApiProperty } from '@nestjs/swagger';

export class Travel{
  /**
   * The name of the city
   * @example Lyon
   */
  @ApiProperty({ example: 'Lyon', description: 'The origin city' })
  origin: string;

  /**
   * The destination city
   * @example Paris
   */
  @ApiProperty({ example: 'Paris', description: 'The destination city' })
  destination: string;

}
