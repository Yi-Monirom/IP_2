import { forwardRef, Module } from '@nestjs/common';
import { NotificationModule } from 'src/notification/notification.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [ClientsModule.register([
        {
            name: 'ORDER_SERVICE',
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 8877,
            },
        },
    ]),NotificationModule],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})

export class OrdersModule {

}
