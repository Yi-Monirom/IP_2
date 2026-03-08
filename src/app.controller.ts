import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DateValidationPipe } from 'src/pipe/dateValidation';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService
  ) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/DateValidation')
  validateDate(@Body('date', DateValidationPipe) date: string): string {
    return `Date validated: ${date}`;
  }


  

}
