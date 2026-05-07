import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductResolver } from '../graphql/resolvers/product.resolver';
import { CategoriesModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductResolver],
  exports: [ProductsService]
})
export class ProductsModule {}
