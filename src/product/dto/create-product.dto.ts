import { IsString, MinLength, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsNumber()
  rating: number;

  @IsString()
  size: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumber()
  price: number;

  @IsNumber()
  promotionAsPercentage: number;

  @IsNumber()
  categoryId: number;
}
