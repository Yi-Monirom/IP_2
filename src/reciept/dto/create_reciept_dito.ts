import { IsDateString, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRecieptDto{

    @IsDateString()
    useDate: Date;
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @Min(0)
    @IsNumber()
    price:number;

}