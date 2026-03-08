import { PipeTransform ,ParseIntPipe, ArgumentMetadata, Injectable, BadRequestException,} from '@nestjs/common';



@Injectable()
export class DateValidationPipe implements PipeTransform {
    transform(value: any) {
       if(!value){
        throw new BadRequestException('Date is required');
       }
        const date = /^\d{2}\/\d{2}\/\d{4}$/;

        if (!date.test(value)) {
          throw new BadRequestException('Invalid date format dd/MM/yyyy');
        }
        const [day, month, year] = value.split('/').map(Number);
        const dateYear= new Date(year);

        if(dateYear.getFullYear() <2010 ){
            return [day, month, year].join('/');
        }else{
            throw new BadRequestException('Year of birth must be < 2010 ');
        }

        return new Date(value);
      } 

        

    

}