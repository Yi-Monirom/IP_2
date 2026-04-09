import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EVENT_PUBLISHER } from 'src/core/token';
import { OrdersService } from 'src/orders/orders.service';

type EventPublisher = { publish: (event: string, payload: any) => void };

@Injectable()
export class NotificationService {
    constructor(
    @Inject(EVENT_PUBLISHER)
    private readonly  publisher : EventPublisher,
  ) {}
    notify(event: string,payload: any){
        console.log(`[NOTIFY] ${event}`,payload);
        return {ok:true};
    }
}
