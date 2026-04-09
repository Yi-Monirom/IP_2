import { Module } from '@nestjs/common';
import { ReceiptsService } from './reciept.service';
import { RecieptController } from './reciept.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { NotificationModule } from 'src/notification/notification.module';


@Module({
  imports:[TypeOrmModule.forFeature([Receipt]),NotificationModule],
  providers: [ReceiptsService],
  controllers: [RecieptController]
})
export class RecieptModule {}
