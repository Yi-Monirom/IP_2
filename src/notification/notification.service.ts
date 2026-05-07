import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EVENT_PUBLISHER } from 'src/core/token';


type EventPublisher = { notify: (event: string, payload: any) => void };

@Injectable()
export class NotificationService {
    constructor(
    @Inject(EVENT_PUBLISHER)
    private readonly  publisher : EventPublisher,
  ) {}
    notify(event: string,payload: any){
        this.publisher.notify(event,payload)
        return {ok:true};
    }
}
