import { Module, forwardRef } from '@nestjs/common';
import { ReceiptsService } from './reciept.service';
import { RecieptController } from './reciept.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { CoreModule } from 'src/core/core.module';


@Module({
  imports:[TypeOrmModule.forFeature([Receipt]),CoreModule,forwardRef(() => NotificationModule)],
  providers: [ReceiptsService],
  controllers: [RecieptController]
})
export class RecieptModule {}
