import { forwardRef, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CoreModule } from 'src/core/core.module';
import { RecieptModule } from 'src/reciept/reciept.module';

@Module({
  imports:[
    CoreModule,forwardRef(() => RecieptModule)
  ],
  providers: [NotificationService],
  controllers: [],
  exports: [NotificationService]

})
export class NotificationModule {}
