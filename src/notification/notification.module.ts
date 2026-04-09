import { forwardRef, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports:[
    CoreModule
  ],
  providers: [NotificationService],
  controllers: [],
  exports: [NotificationService]

})
export class NotificationModule {}
