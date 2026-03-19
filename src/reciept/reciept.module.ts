import { Module } from '@nestjs/common';
import { ReceiptsService } from './reciept.service';
import { RecieptController } from './reciept.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Receipt]) ],
  providers: [ReceiptsService],
  controllers: [RecieptController]
})
export class RecieptModule {}
