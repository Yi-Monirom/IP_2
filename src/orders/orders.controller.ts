import { Body, Controller, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor (private readonly orderservice: OrdersService){}
    @Post('/')
    createOrder(@Body() body){
        return this.orderservice.creatOrder(body);
    }
    
}
