import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RecieptModule } from './reciept/reciept.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './notification/notification.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';

// console.log({
//   user: process.env.DB_USER,
//   pass: process.env.DB_PASSWORD,
// });
// console.log('ENV:', process.env.DB_NAME);
@Module({

  imports: [
    
    ConfigModule.forRoot(
      { isGlobal: true }
    ),
    TypeOrmModule.forRoot(
      {

        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true
      }

    ),

    RecieptModule,

    NotificationModule,

    OrdersModule,

    CoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
