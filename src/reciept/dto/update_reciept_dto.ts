import { IsNumber, IsOptional,  IsString ,Min} from 'class-validator';

export class UpdateRecieptDto{
    @IsOptional()
    @IsString()
    useDate?:Date;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(0) 
    price?:number;


}