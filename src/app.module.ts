import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RecieptModule } from './reciept/reciept.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './notification/notification.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';
import { CategoriesModule } from './category/category.module';
import { ProductsModule } from './product/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),

      playground: true
    }),
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
    CoreModule,
    CategoriesModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
