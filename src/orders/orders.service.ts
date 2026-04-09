import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { forwardRef } from '@nestjs/common';

import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class OrdersService {
    constructor(
        @Inject('ORDER_SERVICE') private client: ClientProxy,
        @Inject(forwardRef(() => NotificationService)) private readonly notifications: NotificationService,
       
    ){}
    creatOrder(orderDto:any){
        this.client.emit('order_created', { order: orderDto, createdAt: new Date().toISOString() });

        this.notifications.notify('order_created', {
        order: orderDto,
        });

        return { status: 'Order accepted', order: orderDto };
    }
}
